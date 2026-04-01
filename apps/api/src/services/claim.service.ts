import { eq, desc, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import { claims } from '../db/schema/claims.js';

type ClaimStatus = (typeof claims.status.enumValues)[number];

interface FindAllOptions {
  page: number;
  perPage: number;
  projectId?: string;
  status?: ClaimStatus;
}

export async function findAllClaims(options: FindAllOptions) {
  const conditions = [];
  if (options.projectId) conditions.push(eq(claims.projectId, options.projectId));
  if (options.status) conditions.push(eq(claims.status, options.status));

  const where = conditions.length > 0 ? sql`${sql.join(conditions, sql` AND `)}` : undefined;

  const [items, countResult] = await Promise.all([
    db.query.claims.findMany({
      where,
      limit: options.perPage,
      offset: (options.page - 1) * options.perPage,
      orderBy: [desc(claims.createdAt)],
      with: { project: true, program: true, milestone: true },
    }),
    db.select({ count: sql<number>`count(*)::int` }).from(claims).where(where),
  ]);

  return {
    items,
    total: countResult[0]?.count ?? 0,
  };
}

export async function findClaimById(id: string) {
  return db.query.claims.findFirst({
    where: eq(claims.id, id),
    with: { project: true, program: true, milestone: true },
  });
}

export async function createClaim(data: typeof claims.$inferInsert) {
  const [claim] = await db.insert(claims).values(data).returning();
  return claim;
}

export async function updateClaimStatus(
  id: string,
  status: ClaimStatus,
  updates: Partial<typeof claims.$inferInsert>,
) {
  const [claim] = await db
    .update(claims)
    .set({ status, ...updates })
    .where(eq(claims.id, id))
    .returning();
  return claim;
}
