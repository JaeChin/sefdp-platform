import { eq, and, isNull, desc, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import { projects } from '../db/schema/projects.js';

interface FindAllOptions {
  page: number;
  perPage: number;
  organizationId?: string;
}

export async function findAllProjects(options: FindAllOptions) {
  const where = and(
    isNull(projects.deletedAt),
    options.organizationId ? eq(projects.organizationId, options.organizationId) : undefined,
  );

  const [items, countResult] = await Promise.all([
    db.query.projects.findMany({
      where,
      limit: options.perPage,
      offset: (options.page - 1) * options.perPage,
      orderBy: [desc(projects.createdAt)],
      with: { organization: true },
    }),
    db.select({ count: sql<number>`count(*)::int` }).from(projects).where(where),
  ]);

  return {
    items,
    total: countResult[0]?.count ?? 0,
  };
}

export async function findProjectById(id: string) {
  return db.query.projects.findFirst({
    where: and(eq(projects.id, id), isNull(projects.deletedAt)),
    with: { organization: true, program: true },
  });
}

export async function createProject(data: typeof projects.$inferInsert) {
  const [project] = await db.insert(projects).values(data).returning();
  return project;
}

export async function updateProject(id: string, data: Partial<typeof projects.$inferInsert>) {
  const [project] = await db
    .update(projects)
    .set(data)
    .where(eq(projects.id, id))
    .returning();
  return project;
}

export async function softDeleteProject(id: string) {
  await db
    .update(projects)
    .set({ deletedAt: new Date() })
    .where(eq(projects.id, id));
}
