import { createHmac, timingSafeEqual } from 'node:crypto';
import type { FastifyRequest, FastifyReply } from 'fastify';

/**
 * Verifies HMAC-SHA256 webhook signatures.
 *
 * Providers must send the signature as:
 *   X-Webhook-Signature: sha256=<hex_digest>
 *
 * The signature is computed over the raw JSON body using WEBHOOK_SECRET.
 *
 * NOTE: This middleware uses JSON.stringify(body) as the signed payload.
 * For strict byte-exact HMAC, install `fastify-raw-body` and use request.rawBody.
 */
export async function verifyWebhookSignature(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const signature = request.headers['x-webhook-signature'];

  if (!signature || typeof signature !== 'string') {
    reply.code(401).send({
      success: false,
      error: { code: 'MISSING_SIGNATURE', message: 'Webhook signature required' },
    });
    return;
  }

  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) {
    request.log.error('WEBHOOK_SECRET is not configured — rejecting webhook');
    reply.code(500).send({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Webhook verification unavailable' },
    });
    return;
  }

  if (!request.body) {
    reply.code(400).send({
      success: false,
      error: { code: 'MISSING_BODY', message: 'Request body is required' },
    });
    return;
  }

  const bodyString =
    typeof request.body === 'string' ? request.body : JSON.stringify(request.body);

  const expectedHex = createHmac('sha256', secret).update(bodyString).digest('hex');
  const expectedHeader = `sha256=${expectedHex}`;

  // timingSafeEqual requires equal-length buffers
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedHeader);

  const valid =
    sigBuf.length === expBuf.length && timingSafeEqual(sigBuf, expBuf);

  if (!valid) {
    request.log.warn({ provider: (request.params as Record<string, string>).provider }, 'Invalid webhook signature');
    reply.code(403).send({
      success: false,
      error: { code: 'INVALID_SIGNATURE', message: 'Webhook signature is invalid' },
    });
    return;
  }
}
