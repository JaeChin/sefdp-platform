import type { FastifyInstance } from 'fastify';
import { logger } from '../../lib/logger.js';
import { verifyWebhookSignature } from '../../middleware/webhook-auth.js';

export async function webhookRoutes(app: FastifyInstance): Promise<void> {
  // All webhook routes require valid HMAC-SHA256 signature
  app.addHook('onRequest', verifyWebhookSignature);

  app.post('/meter/:provider', async (request, reply) => {
    const { provider } = request.params as { provider: string };

    logger.info({ provider }, 'Received verified meter webhook');

    // TODO: parse meter reading data per provider format
    // TODO: store readings via meter-sync job queue (BullMQ)

    return reply.status(200).send({
      success: true,
      data: { message: 'Webhook received' },
    });
  });
}
