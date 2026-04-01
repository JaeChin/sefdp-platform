import type { FastifyInstance } from 'fastify';
import { eq, desc, sql } from 'drizzle-orm';
import { submitClaimSchema, paginationSchema, uuidParamSchema } from '@sefdp/shared';
import { db } from '../../db/index.js';
import { claims } from '../../db/schema/claims.js';
import { authenticate } from '../../middleware/auth.js';
import { requireRole } from '../../middleware/rbac.js';

export async function claimRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', authenticate);

  app.get('/', async (request, reply) => {
    const query = paginationSchema.parse(request.query);

    const [items, countResult] = await Promise.all([
      db.query.claims.findMany({
        limit: query.perPage,
        offset: (query.page - 1) * query.perPage,
        orderBy: [desc(claims.createdAt)],
        with: { project: true, program: true },
      }),
      db.select({ count: sql<number>`count(*)::int` }).from(claims),
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

    const claim = await db.query.claims.findFirst({
      where: eq(claims.id, id),
      with: { project: true, milestone: true, program: true },
    });

    if (!claim) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Claim not found' },
      });
    }

    return reply.status(200).send({ success: true, data: claim });
  });

  app.post(
    '/',
    {
      preHandler: [
        requireRole('super_admin', 'pmu_admin', 'developer_admin', 'developer_member'),
      ],
    },
    async (request, reply) => {
      const body = submitClaimSchema.parse(request.body);

      const [claim] = await db
        .insert(claims)
        .values({
          projectId: body.projectId,
          milestoneId: body.milestoneId,
          programId: body.programId,
          claimType: body.claimType,
          connectionsClaimed: body.connectionsClaimed,
          avgConsumptionKwh: body.avgConsumptionKwh.toString(),
          uptimePercentage: body.uptimePercentage.toString(),
          paymentCompliance: body.paymentCompliance.toString(),
          claimedAmountUsd: BigInt(Math.round(body.claimedAmountUsd * 100)),
          evidenceNotes: body.evidenceNotes,
          submittedBy: request.user.userId,
          submittedAt: new Date(),
          status: 'submitted',
        })
        .returning();

      return reply.status(201).send({ success: true, data: claim });
    },
  );

  app.post(
    '/:id/verify',
    {
      preHandler: [requireRole('super_admin', 'pmu_admin')],
    },
    async (request, reply) => {
      const { id } = uuidParamSchema.parse(request.params);
      const body = request.body as {
        connectionsVerified: number;
        verifiedAmountUsd: number;
      };

      const [updated] = await db
        .update(claims)
        .set({
          status: 'verified',
          connectionsVerified: body.connectionsVerified,
          verifiedAmountUsd: BigInt(Math.round(body.verifiedAmountUsd * 100)),
          verifiedBy: request.user.userId,
          verifiedAt: new Date(),
        })
        .where(eq(claims.id, id))
        .returning();

      if (!updated) {
        return reply.status(404).send({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Claim not found' },
        });
      }

      return reply.status(200).send({ success: true, data: updated });
    },
  );

  app.post(
    '/:id/approve',
    {
      preHandler: [requireRole('super_admin', 'pmu_admin')],
    },
    async (request, reply) => {
      const { id } = uuidParamSchema.parse(request.params);
      const body = request.body as { approvedAmountUsd: number };

      const [updated] = await db
        .update(claims)
        .set({
          status: 'approved',
          approvedAmountUsd: BigInt(Math.round(body.approvedAmountUsd * 100)),
          approvedBy: request.user.userId,
          approvedAt: new Date(),
        })
        .where(eq(claims.id, id))
        .returning();

      if (!updated) {
        return reply.status(404).send({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Claim not found' },
        });
      }

      return reply.status(200).send({ success: true, data: updated });
    },
  );
}
