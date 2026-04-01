import type { FastifyInstance } from 'fastify';
import { eq, desc, sql } from 'drizzle-orm';
import { financierProfileSchema, paginationSchema, uuidParamSchema } from '@sefdp/shared';
import { db } from '../../db/index.js';
import { financierProfiles } from '../../db/schema/financier-profiles.js';
import { authenticate } from '../../middleware/auth.js';
import { requireRole } from '../../middleware/rbac.js';

export async function financierRoutes(app: FastifyInstance): Promise<void> {
  app.get('/', async (request, reply) => {
    const query = paginationSchema.parse(request.query);

    const where = eq(financierProfiles.isActive, true);

    const [items, countResult] = await Promise.all([
      db.query.financierProfiles.findMany({
        where,
        limit: query.perPage,
        offset: (query.page - 1) * query.perPage,
        orderBy: [desc(financierProfiles.createdAt)],
        with: { organization: true },
      }),
      db.select({ count: sql<number>`count(*)::int` }).from(financierProfiles).where(where),
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

    const profile = await db.query.financierProfiles.findFirst({
      where: eq(financierProfiles.id, id),
      with: { organization: true },
    });

    if (!profile) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Financier profile not found' },
      });
    }

    return reply.status(200).send({ success: true, data: profile });
  });

  app.patch(
    '/me',
    {
      preHandler: [
        authenticate,
        requireRole('financier_admin', 'financier_analyst', 'super_admin'),
      ],
    },
    async (request, reply) => {
      const body = financierProfileSchema.partial().parse(request.body);

      const existing = await db.query.financierProfiles.findFirst({
        where: eq(financierProfiles.organizationId, request.user.organizationId),
      });

      if (!existing) {
        const [created] = await db
          .insert(financierProfiles)
          .values({
            organizationId: request.user.organizationId,
            financierType: body.financierType ?? 'investor',
            minDealSizeUsd: body.minDealSizeUsd ? BigInt(body.minDealSizeUsd) : null,
            maxDealSizeUsd: body.maxDealSizeUsd ? BigInt(body.maxDealSizeUsd) : null,
            preferredCountries: body.preferredCountries,
            preferredTypes: body.preferredTypes,
            minIrr: body.minIrr?.toString(),
            maxRiskRating: body.maxRiskRating,
            instruments: body.instruments,
            ticketCurrency: body.ticketCurrency,
            description: body.description,
          })
          .returning();
        return reply.status(201).send({ success: true, data: created });
      }

      const updateData: Record<string, unknown> = { ...body };
      if (body.minDealSizeUsd !== undefined) {
        updateData.minDealSizeUsd = BigInt(body.minDealSizeUsd);
      }
      if (body.maxDealSizeUsd !== undefined) {
        updateData.maxDealSizeUsd = BigInt(body.maxDealSizeUsd);
      }
      if (body.minIrr !== undefined) {
        updateData.minIrr = body.minIrr.toString();
      }

      const [updated] = await db
        .update(financierProfiles)
        .set(updateData)
        .where(eq(financierProfiles.id, existing.id))
        .returning();

      return reply.status(200).send({ success: true, data: updated });
    },
  );
}
