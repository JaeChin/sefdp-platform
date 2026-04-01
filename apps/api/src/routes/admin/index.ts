import type { FastifyInstance } from 'fastify';
import { eq, desc, sql } from 'drizzle-orm';
import { paginationSchema, uuidParamSchema } from '@sefdp/shared';
import type { UserRole } from '@sefdp/shared';
import { db } from '../../db/index.js';
import { users } from '../../db/schema/users.js';
import { programs } from '../../db/schema/programs.js';
import { authenticate } from '../../middleware/auth.js';
import { requireRole } from '../../middleware/rbac.js';

export async function adminRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', authenticate);
  app.addHook('preHandler', requireRole('super_admin', 'pmu_admin'));

  // --- Users ---

  app.get('/users', async (request, reply) => {
    const query = paginationSchema.parse(request.query);

    const [items, countResult] = await Promise.all([
      db.query.users.findMany({
        limit: query.perPage,
        offset: (query.page - 1) * query.perPage,
        orderBy: [desc(users.createdAt)],
        with: { organization: true },
        columns: {
          passwordHash: false,
        },
      }),
      db.select({ count: sql<number>`count(*)::int` }).from(users),
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

  app.get('/users/:id', async (request, reply) => {
    const { id } = uuidParamSchema.parse(request.params);

    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: { organization: true },
      columns: { passwordHash: false },
    });

    if (!user) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'User not found' },
      });
    }

    return reply.status(200).send({ success: true, data: user });
  });

  app.patch('/users/:id', async (request, reply) => {
    const { id } = uuidParamSchema.parse(request.params);
    const body = request.body as { isActive?: boolean; role?: UserRole };

    const [updated] = await db
      .update(users)
      .set(body)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
        isActive: users.isActive,
      });

    if (!updated) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'User not found' },
      });
    }

    return reply.status(200).send({ success: true, data: updated });
  });

  // --- Programs ---

  app.get('/programs', async (request, reply) => {
    const query = paginationSchema.parse(request.query);

    const [items, countResult] = await Promise.all([
      db.query.programs.findMany({
        limit: query.perPage,
        offset: (query.page - 1) * query.perPage,
        orderBy: [desc(programs.createdAt)],
      }),
      db.select({ count: sql<number>`count(*)::int` }).from(programs),
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

  app.post('/programs', async (request, reply) => {
    const body = request.body as {
      name: string;
      type: string;
      description?: string;
      deadline?: string;
    };

    const [program] = await db
      .insert(programs)
      .values({
        name: body.name,
        type: body.type as 'minigrid_pbg' | 'minigrid_mst' | 'sas_pbg' | 'sas_catalytic',
        description: body.description,
        deadline: body.deadline ? new Date(body.deadline) : null,
        createdBy: request.user.userId,
      })
      .returning();

    return reply.status(201).send({ success: true, data: program });
  });

  app.patch('/programs/:id', async (request, reply) => {
    const { id } = uuidParamSchema.parse(request.params);
    const body = request.body as Record<string, unknown>;

    const [updated] = await db
      .update(programs)
      .set(body)
      .where(eq(programs.id, id))
      .returning();

    if (!updated) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Program not found' },
      });
    }

    return reply.status(200).send({ success: true, data: updated });
  });
}
