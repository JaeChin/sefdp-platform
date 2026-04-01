import type { FastifyInstance } from 'fastify';
import { eq, desc, sql } from 'drizzle-orm';
import { paginationSchema, uuidParamSchema } from '@sefdp/shared';
import { db } from '../../db/index.js';
import { milestones } from '../../db/schema/milestones.js';
import { authenticate } from '../../middleware/auth.js';
import { requireRole } from '../../middleware/rbac.js';

export async function milestoneRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', authenticate);

  app.get('/', async (request, reply) => {
    const query = paginationSchema.parse(request.query);

    const [items, countResult] = await Promise.all([
      db.query.milestones.findMany({
        limit: query.perPage,
        offset: (query.page - 1) * query.perPage,
        orderBy: [desc(milestones.createdAt)],
        with: { project: true },
      }),
      db.select({ count: sql<number>`count(*)::int` }).from(milestones),
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

    const milestone = await db.query.milestones.findFirst({
      where: eq(milestones.id, id),
      with: { project: true, program: true },
    });

    if (!milestone) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Milestone not found' },
      });
    }

    return reply.status(200).send({ success: true, data: milestone });
  });

  app.post(
    '/',
    {
      preHandler: [requireRole('super_admin', 'pmu_admin')],
    },
    async (request, reply) => {
      // TODO: add Zod schema for milestone creation
      const body = request.body as {
        projectId: string;
        programId?: string;
        name: string;
        description?: string;
        sequenceOrder: number;
        targetDate?: string;
        connectionsRequired?: number;
        disbursementAmountUsd?: number;
      };

      const [milestone] = await db
        .insert(milestones)
        .values({
          projectId: body.projectId,
          programId: body.programId,
          name: body.name,
          description: body.description,
          sequenceOrder: body.sequenceOrder,
          targetDate: body.targetDate ? new Date(body.targetDate) : null,
          connectionsRequired: body.connectionsRequired,
          disbursementAmountUsd: body.disbursementAmountUsd
            ? BigInt(Math.round(body.disbursementAmountUsd * 100))
            : null,
        })
        .returning();

      return reply.status(201).send({ success: true, data: milestone });
    },
  );

  app.patch(
    '/:id/status',
    {
      preHandler: [requireRole('super_admin', 'pmu_admin')],
    },
    async (request, reply) => {
      const { id } = uuidParamSchema.parse(request.params);
      const { status } = request.body as { status: typeof milestones.status.enumValues[number] };

      const [updated] = await db
        .update(milestones)
        .set({ status })
        .where(eq(milestones.id, id))
        .returning();

      if (!updated) {
        return reply.status(404).send({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Milestone not found' },
        });
      }

      return reply.status(200).send({ success: true, data: updated });
    },
  );
}
