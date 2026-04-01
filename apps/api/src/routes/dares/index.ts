import type { FastifyInstance } from 'fastify';
import { projectRoutes } from './projects.js';
import { applicationRoutes } from './applications.js';
import { milestoneRoutes } from './milestones.js';
import { claimRoutes } from './claims.js';

export async function daresRoutes(app: FastifyInstance): Promise<void> {
  await app.register(projectRoutes, { prefix: '/projects' });
  await app.register(applicationRoutes, { prefix: '/applications' });
  await app.register(milestoneRoutes, { prefix: '/milestones' });
  await app.register(claimRoutes, { prefix: '/claims' });
}
