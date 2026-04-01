import type { FastifyInstance } from 'fastify';
import { developerRoutes } from './developers.js';
import { financierRoutes } from './financiers.js';
import { matchRoutes } from './matches.js';

export async function marketplaceRoutes(app: FastifyInstance): Promise<void> {
  await app.register(developerRoutes, { prefix: '/developers' });
  await app.register(financierRoutes, { prefix: '/financiers' });
  await app.register(matchRoutes, { prefix: '/matches' });
}
