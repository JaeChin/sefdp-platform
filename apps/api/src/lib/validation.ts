import { z } from 'zod';
import type { FastifyReply } from 'fastify';

/**
 * Parses and validates a request body against a Zod schema.
 * Returns { success: true, data } or sends a 400 and returns { success: false }.
 *
 * Usage:
 *   const result = validateBody(request.body, mySchema, reply);
 *   if (!result.success) return; // reply already sent
 *   const body = result.data;
 */
export function validateBody<T extends z.ZodTypeAny>(
  body: unknown,
  schema: T,
  reply: FastifyReply,
): { success: true; data: z.infer<T> } | { success: false } {
  const result = schema.safeParse(body);

  if (!result.success) {
    reply.code(400).send({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request body',
        details: result.error.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      },
    });
    return { success: false };
  }

  return { success: true, data: result.data };
}
