import type { FastifyInstance } from 'fastify';
import { eq, desc, sql } from 'drizzle-orm';
import { developerProfileSchema, paginationSchema, uuidParamSchema } from '@sefdp/shared';
import { db } from '../../db/index.js';
import { developerProfiles } from '../../db/schema/developer-profiles.js';
import { authenticate } from '../../middleware/auth.js';
import { requireRole } from '../../middleware/rbac.js';

export async function developerRoutes(app: FastifyInstance): Promise<void> {
  app.get('/', async (request, reply) => {
    const query = paginationSchema.parse(request.query);

    const where = eq(developerProfiles.isPublished, true);

    const [items, countResult] = await Promise.all([
      db.query.developerProfiles.findMany({
        where,
        limit: query.perPage,
        offset: (query.page - 1) * query.perPage,
        orderBy: [desc(developerProfiles.creditScore)],
        with: { organization: true },
      }),
      db.select({ count: sql<number>`count(*)::int` }).from(developerProfiles).where(where),
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

    const profile = await db.query.developerProfiles.findFirst({
      where: eq(developerProfiles.id, id),
      with: { organization: true },
    });

    if (!profile) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Developer profile not found' },
      });
    }

    return reply.status(200).send({ success: true, data: profile });
  });

  app.patch(
    '/me',
    {
      preHandler: [authenticate, requireRole('developer_admin', 'developer_member', 'super_admin')],
    },
    async (request, reply) => {
      const body = developerProfileSchema.partial().parse(request.body);

      const existing = await db.query.developerProfiles.findFirst({
        where: eq(developerProfiles.organizationId, request.user.organizationId),
      });

      if (!existing) {
        const [created] = await db
          .insert(developerProfiles)
          .values({
            organizationId: request.user.organizationId,
            ...body,
            countriesOperating: body.countriesOperating,
            operatingStates: body.operatingStates,
            projectTypes: body.projectTypes,
            totalCapacityKw: body.totalCapacityKw?.toString(),
            avgTariffUsdKwh: body.avgTariffUsdKwh?.toString(),
            avgUptimePercentage: body.avgUptimePercentage?.toString(),
          })
          .returning();
        return reply.status(201).send({ success: true, data: created });
      }

      const [updated] = await db
        .update(developerProfiles)
        .set({
          ...body,
          countriesOperating: body.countriesOperating,
          operatingStates: body.operatingStates,
          projectTypes: body.projectTypes,
          totalCapacityKw: body.totalCapacityKw?.toString(),
          avgTariffUsdKwh: body.avgTariffUsdKwh?.toString(),
          avgUptimePercentage: body.avgUptimePercentage?.toString(),
        })
        .where(eq(developerProfiles.id, existing.id))
        .returning();

      return reply.status(200).send({ success: true, data: updated });
    },
  );
}
