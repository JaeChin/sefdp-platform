import type { FastifyRequest, FastifyReply, preHandlerHookHandler } from 'fastify';
import type { UserRole } from '@sefdp/shared';

export function requireRole(...roles: UserRole[]): preHandlerHookHandler {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      });
    }

    if (!roles.includes(request.user.role)) {
      return reply.status(403).send({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Insufficient permissions for this action',
        },
      });
    }
  };
}

export function requireOrgAccess(): preHandlerHookHandler {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      });
    }

    const params = request.params as Record<string, string>;
    const orgId = params.organizationId ?? (request.body as Record<string, string>)?.organizationId;

    const isAdmin = ['super_admin', 'pmu_admin'].includes(request.user.role);
    if (orgId && !isAdmin && request.user.organizationId !== orgId) {
      return reply.status(403).send({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have access to this organization',
        },
      });
    }
  };
}
