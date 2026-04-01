import type { FastifyInstance } from 'fastify';
import { eq, desc, sql } from 'drizzle-orm';
import { updateMatchStatusSchema, paginationSchema, uuidParamSchema } from '@sefdp/shared';
import { db } from '../../db/index.js';
import { projectMatches } from '../../db/schema/project-matches.js';
import { authenticate } from '../../middleware/auth.js';

export async function matchRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', authenticate);

  app.get('/', async (request, reply) => {
    const query = paginationSchema.parse(request.query);

    const [items, countResult] = await Promise.all([
      db.query.projectMatches.findMany({
        limit: query.perPage,
        offset: (query.page - 1) * query.perPage,
        orderBy: [desc(projectMatches.createdAt)],
        with: { project: true, financierProfile: true },
      }),
      db.select({ count: sql<number>`count(*)::int` }).from(projectMatches),
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

    const match = await db.query.projectMatches.findFirst({
      where: eq(projectMatches.id, id),
      with: { project: true, financierProfile: true },
    });

    if (!match) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Match not found' },
      });
    }

    return reply.status(200).send({ success: true, data: match });
  });

  app.patch('/:id/status', async (request, reply) => {
    const { id } = uuidParamSchema.parse(request.params);
    const { status } = updateMatchStatusSchema.parse(request.body);

    const [updated] = await db
      .update(projectMatches)
      .set({ status, lastActivityAt: new Date() })
      .where(eq(projectMatches.id, id))
      .returning();

    if (!updated) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Match not found' },
      });
    }

    return reply.status(200).send({ success: true, data: updated });
  });

  app.get('/recommendations', async (request, reply) => {
    // TODO: implement matching algorithm
    return reply.status(200).send({
      success: true,
      data: [],
      meta: { page: 1, perPage: 20, total: 0, totalPages: 0 },
    });
  });
}
