import type { FastifyInstance } from 'fastify';
import { logger } from '../../lib/logger.js';

export async function webhookRoutes(app: FastifyInstance): Promise<void> {
  app.post('/meter/:provider', async (request, reply) => {
    const { provider } = request.params as { provider: string };

    logger.info({ provider }, 'Received meter webhook');

    // TODO: validate webhook signature per provider
    // TODO: parse meter reading data per provider format
    // TODO: store readings via meter-sync job queue

    return reply.status(200).send({
      success: true,
      data: { message: 'Webhook received' },
    });
  });
}
