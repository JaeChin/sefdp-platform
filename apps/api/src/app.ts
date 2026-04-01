import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import multipart from '@fastify/multipart';
import websocket from '@fastify/websocket';
import type { ZodError } from 'zod';

import { env } from './env.js';
import { logger } from './lib/logger.js';
import { auditHook } from './middleware/audit.js';
import { authRoutes } from './routes/auth/index.js';
import { daresRoutes } from './routes/dares/index.js';
import { marketplaceRoutes } from './routes/marketplace/index.js';
import { adminRoutes } from './routes/admin/index.js';
import { webhookRoutes } from './routes/webhooks/index.js';

export async function buildApp() {
  const app = Fastify({
    logger,
    disableRequestLogging: false,
    requestIdLogLabel: 'requestId',
    genReqId: () => crypto.randomUUID(),
  });

  await app.register(cors, {
    origin: env.CORS_ORIGINS.split(',').map((o) => o.trim()),
    credentials: true,
  });

  await app.register(helmet, {
    contentSecurityPolicy: false,
  });

  await app.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_WINDOW_MS,
  });

  await app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
      files: 5,
    },
  });

  await app.register(websocket);

  app.addHook('onResponse', auditHook);

  app.setErrorHandler((error, request, reply) => {
    const statusCode = error.statusCode ?? 500;

    if ((error as unknown as { validation?: unknown }).validation) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Request validation failed',
          details: (error as unknown as { validation: unknown }).validation,
        },
      });
    }

    if ('issues' in error && Array.isArray((error as unknown as ZodError).issues)) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Request validation failed',
          details: (error as unknown as ZodError).issues.map((i) => ({
            path: i.path.join('.'),
            message: i.message,
          })),
        },
      });
    }

    if (statusCode >= 500) {
      request.log.error({ err: error }, 'Internal server error');
    }

    return reply.status(statusCode).send({
      success: false,
      error: {
        code: error.code ?? 'INTERNAL_ERROR',
        message: statusCode >= 500 ? 'An internal error occurred' : error.message,
      },
    });
  });

  app.get('/health', async () => ({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version ?? '0.0.0',
    },
  }));

  await app.register(authRoutes, { prefix: '/api/v1/auth' });
  await app.register(daresRoutes, { prefix: '/api/v1' });
  await app.register(marketplaceRoutes, { prefix: '/api/v1/marketplace' });
  await app.register(adminRoutes, { prefix: '/api/v1/admin' });
  await app.register(webhookRoutes, { prefix: '/api/v1/webhooks' });

  return app;
}
