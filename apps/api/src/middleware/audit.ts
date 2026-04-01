import type { FastifyRequest, FastifyReply, onResponseHookHandler } from 'fastify';
import { db } from '../db/index.js';
import { auditLogs } from '../db/schema/audit-logs.js';
import { logger } from '../lib/logger.js';

const NON_AUDITED_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

function extractEntityInfo(request: FastifyRequest): {
  entityType: string | null;
  entityId: string | null;
} {
  const url = request.url;
  const segments = url.split('/').filter(Boolean);

  // Pattern: /api/v1/{entityType}/{entityId}
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  let entityType: string | null = null;
  let entityId: string | null = null;

  for (let i = segments.length - 1; i >= 0; i--) {
    const segment = segments[i];
    if (segment && uuidRegex.test(segment)) {
      entityId = segment;
      entityType = segments[i - 1] ?? null;
      break;
    }
  }

  return { entityType, entityId };
}

export const auditHook: onResponseHookHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (NON_AUDITED_METHODS.has(request.method)) return;

  try {
    const { entityType, entityId } = extractEntityInfo(request);

    const action = `${request.method} ${request.routeOptions?.url ?? request.url}`;

    await db.insert(auditLogs).values({
      userId: request.user?.userId ?? null,
      organizationId: request.user?.organizationId ?? null,
      action,
      entityType,
      entityId,
      ipAddress: request.ip,
      userAgent: request.headers['user-agent'] ?? null,
    });
  } catch (err) {
    logger.error(err, 'Failed to write audit log');
  }
};
