import type { FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';
import {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '@sefdp/shared';
import type { UserRole } from '@sefdp/shared';
import { db } from '../../db/index.js';
import { users } from '../../db/schema/users.js';
import { organizations } from '../../db/schema/organizations.js';
import {
  hashPassword,
  verifyPassword,
  generateTokens,
  rotateRefreshToken,
  revokeRefreshToken,
} from '../../services/auth.service.js';
import { authenticate } from '../../middleware/auth.js';

export async function authRoutes(app: FastifyInstance): Promise<void> {
  app.post('/login', async (request, reply) => {
    const body = loginSchema.parse(request.body);

    const user = await db.query.users.findFirst({
      where: eq(users.email, body.email),
    });

    if (!user || user.deletedAt) {
      return reply.status(401).send({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
      });
    }

    if (!user.isActive) {
      return reply.status(403).send({
        success: false,
        error: { code: 'ACCOUNT_DISABLED', message: 'Account is disabled' },
      });
    }

    const valid = await verifyPassword(user.passwordHash, body.password);
    if (!valid) {
      return reply.status(401).send({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
      });
    }

    await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));

    const tokens = await generateTokens(
      { id: user.id, organizationId: user.organizationId, role: user.role as UserRole },
      request.ip,
      request.headers['user-agent'],
    );

    return reply.status(200).send({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          organizationId: user.organizationId,
        },
        tokens,
      },
    });
  });

  app.post('/register', async (request, reply) => {
    const body = registerSchema.parse(request.body);

    const existing = await db.query.users.findFirst({
      where: eq(users.email, body.email),
    });

    if (existing) {
      return reply.status(409).send({
        success: false,
        error: { code: 'EMAIL_EXISTS', message: 'An account with this email already exists' },
      });
    }

    const org = await db.query.organizations.findFirst({
      where: eq(organizations.id, body.organizationId),
    });

    if (!org) {
      return reply.status(400).send({
        success: false,
        error: { code: 'INVALID_ORG', message: 'Organization not found' },
      });
    }

    const passwordHash = await hashPassword(body.password);

    const [newUser] = await db
      .insert(users)
      .values({
        email: body.email,
        passwordHash,
        firstName: body.firstName,
        lastName: body.lastName,
        role: body.role,
        organizationId: body.organizationId,
      })
      .returning();

    if (!newUser) {
      return reply.status(500).send({
        success: false,
        error: { code: 'CREATE_FAILED', message: 'Failed to create user' },
      });
    }

    const tokens = await generateTokens(
      { id: newUser.id, organizationId: newUser.organizationId, role: newUser.role as UserRole },
      request.ip,
      request.headers['user-agent'],
    );

    return reply.status(201).send({
      success: true,
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
          organizationId: newUser.organizationId,
        },
        tokens,
      },
    });
  });

  app.post('/refresh', async (request, reply) => {
    const body = refreshTokenSchema.parse(request.body);

    const tokens = await rotateRefreshToken(
      body.refreshToken,
      request.ip,
      request.headers['user-agent'],
    );

    if (!tokens) {
      return reply.status(401).send({
        success: false,
        error: { code: 'INVALID_REFRESH_TOKEN', message: 'Invalid or expired refresh token' },
      });
    }

    return reply.status(200).send({ success: true, data: { tokens } });
  });

  app.post('/logout', { preHandler: [authenticate] }, async (request, reply) => {
    const body = refreshTokenSchema.parse(request.body);
    await revokeRefreshToken(body.refreshToken);
    return reply.status(200).send({ success: true, data: { message: 'Logged out' } });
  });

  app.post('/forgot-password', async (request, reply) => {
    forgotPasswordSchema.parse(request.body);
    // TODO: Implement password reset email flow
    return reply.status(200).send({
      success: true,
      data: { message: 'If that email exists, a reset link has been sent' },
    });
  });

  app.post('/reset-password', async (request, reply) => {
    resetPasswordSchema.parse(request.body);
    // TODO: Implement password reset verification + update
    return reply.status(200).send({
      success: true,
      data: { message: 'Password has been reset' },
    });
  });
}
