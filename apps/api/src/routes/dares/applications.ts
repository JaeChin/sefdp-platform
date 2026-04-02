import type { FastifyInstance } from 'fastify';
import { eq, desc, sql } from 'drizzle-orm';
import {
  createApplicationSchema,
  updateApplicationSchema,
  paginationSchema,
  uuidParamSchema,
} from '@sefdp/shared';
import { db } from '../../db/index.js';
import { applications } from '../../db/schema/applications.js';
import { authenticate } from '../../middleware/auth.js';
import { requireRole } from '../../middleware/rbac.js';
import { validateBody } from '../../lib/validation.js';

export async function applicationRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', authenticate);

  app.get('/', async (request, reply) => {
    const query = paginationSchema.parse(request.query);

    const [items, countResult] = await Promise.all([
      db.query.applications.findMany({
        limit: query.perPage,
        offset: (query.page - 1) * query.perPage,
        orderBy: [desc(applications.createdAt)],
        with: { project: true, program: true },
      }),
      db.select({ count: sql<number>`count(*)::int` }).from(applications),
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

    const application = await db.query.applications.findFirst({
      where: eq(applications.id, id),
      with: { project: true, program: true, reviewer: true },
    });

    if (!application) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Application not found' },
      });
    }

    return reply.status(200).send({ success: true, data: application });
  });

  app.post(
    '/',
    {
      preHandler: [
        requireRole('super_admin', 'pmu_admin', 'developer_admin', 'developer_member'),
      ],
    },
    async (request, reply) => {
      const body = createApplicationSchema.parse(request.body);

      const [application] = await db
        .insert(applications)
        .values(body)
        .returning();

      return reply.status(201).send({ success: true, data: application });
    },
  );

  app.post(
    '/:id/submit',
    {
      preHandler: [
        requireRole('super_admin', 'pmu_admin', 'developer_admin', 'developer_member'),
      ],
    },
    async (request, reply) => {
      const { id } = uuidParamSchema.parse(request.params);

      const [updated] = await db
        .update(applications)
        .set({ status: 'submitted', submittedAt: new Date() })
        .where(eq(applications.id, id))
        .returning();

      if (!updated) {
        return reply.status(404).send({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Application not found' },
        });
      }

      return reply.status(200).send({ success: true, data: updated });
    },
  );

  app.patch(
    '/:id',
    {
      preHandler: [requireRole('super_admin', 'pmu_admin')],
    },
    async (request, reply) => {
      const { id } = uuidParamSchema.parse(request.params);
      const result = validateBody(request.body, updateApplicationSchema, reply);
      if (!result.success) return;
      const body = result.data;

      const updateData: Record<string, unknown> = { ...body };
      if (body.reviewedAt) {
        updateData.reviewedAt = new Date(body.reviewedAt);
      }

      const [updated] = await db
        .update(applications)
        .set(updateData)
        .where(eq(applications.id, id))
        .returning();

      if (!updated) {
        return reply.status(404).send({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Application not found' },
        });
      }

      return reply.status(200).send({ success: true, data: updated });
    },
  );
}
