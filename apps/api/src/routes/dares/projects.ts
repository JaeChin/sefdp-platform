import type { FastifyInstance } from 'fastify';
import { eq, and, isNull, desc, sql } from 'drizzle-orm';
import {
  createProjectSchema,
  updateProjectSchema,
  paginationSchema,
  uuidParamSchema,
} from '@sefdp/shared';
import { db } from '../../db/index.js';
import { projects } from '../../db/schema/projects.js';
import { authenticate } from '../../middleware/auth.js';
import { requireRole } from '../../middleware/rbac.js';

export async function projectRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', authenticate);

  app.get('/', async (request, reply) => {
    const query = paginationSchema.parse(request.query);
    const isAdmin = ['super_admin', 'pmu_admin', 'pmu_viewer'].includes(request.user.role);

    const where = and(
      isNull(projects.deletedAt),
      isAdmin ? undefined : eq(projects.organizationId, request.user.organizationId),
    );

    const [items, countResult] = await Promise.all([
      db.query.projects.findMany({
        where,
        limit: query.perPage,
        offset: (query.page - 1) * query.perPage,
        orderBy: [desc(projects.createdAt)],
        with: { organization: true },
      }),
      db.select({ count: sql<number>`count(*)::int` }).from(projects).where(where),
    ]);

    const total = countResult[0]?.count ?? 0;

    return reply.status(200).send({
      success: true,
      data: items,
      meta: {
        page: query.page,
        perPage: query.perPage,
        total,
        totalPages: Math.ceil(total / query.perPage),
      },
    });
  });

  app.get('/:id', async (request, reply) => {
    const { id } = uuidParamSchema.parse(request.params);

    const project = await db.query.projects.findFirst({
      where: and(eq(projects.id, id), isNull(projects.deletedAt)),
      with: { organization: true, program: true },
    });

    if (!project) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Project not found' },
      });
    }

    const isAdmin = ['super_admin', 'pmu_admin', 'pmu_viewer'].includes(request.user.role);
    if (!isAdmin && project.organizationId !== request.user.organizationId) {
      return reply.status(403).send({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Access denied' },
      });
    }

    return reply.status(200).send({ success: true, data: project });
  });

  app.post(
    '/',
    {
      preHandler: [
        requireRole(
          'super_admin',
          'pmu_admin',
          'developer_admin',
          'developer_member',
        ),
      ],
    },
    async (request, reply) => {
      const body = createProjectSchema.parse(request.body);
      const { estimatedCostUsd, estimatedCommissioningDate, latitude, longitude, pvCapacityKw, storageKwh, ...rest } = body;

      const [project] = await db
        .insert(projects)
        .values({
          ...rest,
          organizationId: request.user.organizationId,
          createdBy: request.user.userId,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          pvCapacityKw: pvCapacityKw.toString(),
          storageKwh: storageKwh.toString(),
          capexUsd: estimatedCostUsd
            ? BigInt(Math.round(estimatedCostUsd * 100))
            : null,
          codDate: estimatedCommissioningDate ?? null,
        })
        .returning();

      return reply.status(201).send({ success: true, data: project });
    },
  );

  app.patch(
    '/:id',
    {
      preHandler: [
        requireRole(
          'super_admin',
          'pmu_admin',
          'developer_admin',
          'developer_member',
        ),
      ],
    },
    async (request, reply) => {
      const { id } = uuidParamSchema.parse(request.params);
      const body = updateProjectSchema.parse(request.body);

      const existing = await db.query.projects.findFirst({
        where: and(eq(projects.id, id), isNull(projects.deletedAt)),
      });

      if (!existing) {
        return reply.status(404).send({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Project not found' },
        });
      }

      const isAdmin = ['super_admin', 'pmu_admin'].includes(request.user.role);
      if (!isAdmin && existing.organizationId !== request.user.organizationId) {
        return reply.status(403).send({
          success: false,
          error: { code: 'FORBIDDEN', message: 'Access denied' },
        });
      }

      const updateData: Record<string, unknown> = { ...body };
      if (body.latitude !== undefined) updateData.latitude = body.latitude.toString();
      if (body.longitude !== undefined) updateData.longitude = body.longitude.toString();
      if (body.pvCapacityKw !== undefined) updateData.pvCapacityKw = body.pvCapacityKw.toString();
      if (body.storageKwh !== undefined) updateData.storageKwh = body.storageKwh.toString();
      if (body.estimatedCostUsd !== undefined) {
        updateData.estimatedCostUsd = BigInt(Math.round(body.estimatedCostUsd * 100));
      }

      const [updated] = await db
        .update(projects)
        .set(updateData)
        .where(eq(projects.id, id))
        .returning();

      return reply.status(200).send({ success: true, data: updated });
    },
  );

  app.delete(
    '/:id',
    {
      preHandler: [requireRole('super_admin', 'pmu_admin', 'developer_admin')],
    },
    async (request, reply) => {
      const { id } = uuidParamSchema.parse(request.params);

      const existing = await db.query.projects.findFirst({
        where: and(eq(projects.id, id), isNull(projects.deletedAt)),
      });

      if (!existing) {
        return reply.status(404).send({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Project not found' },
        });
      }

      const isAdmin = ['super_admin', 'pmu_admin'].includes(request.user.role);
      if (!isAdmin && existing.organizationId !== request.user.organizationId) {
        return reply.status(403).send({
          success: false,
          error: { code: 'FORBIDDEN', message: 'Access denied' },
        });
      }

      await db
        .update(projects)
        .set({ deletedAt: new Date() })
        .where(eq(projects.id, id));

      return reply.status(200).send({
        success: true,
        data: { message: 'Project deleted' },
      });
    },
  );
}
