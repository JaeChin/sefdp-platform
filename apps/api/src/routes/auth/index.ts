import type { FastifyInstance } from 'fastify';
import { eq, and, isNull, gt } from 'drizzle-orm';
import crypto from 'node:crypto';
import {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '@sefdp/shared';
import type { UserRole } from '@sefdp/shared';
import { db } from '../../db/index.js';
import { users } from '../../db/schema/users.js';
import { organizations } from '../../db/schema/organizations.js';
import { passwordResetTokens } from '../../db/schema/password-reset-tokens.js';
import {
  hashPassword,
  verifyPassword,
  generateTokens,
  rotateRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens,
} from '../../services/auth.service.js';
import { authenticate } from '../../middleware/auth.js';
import { authRateLimit } from '../../middleware/rate-limit.js';
import { sendEmail, passwordResetTemplate } from '../../lib/email.js';
import { env } from '../../env.js';

function hashResetToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function authRoutes(app: FastifyInstance): Promise<void> {
  app.post(
    '/login',
    { config: { rateLimit: authRateLimit() } },
    async (request, reply) => {
      const body = loginSchema.parse(request.body);

      const user = await db.query.users.findFirst({
        where: eq(users.email, body.email),
      });

      if (!user || user.deletedAt) {
        return reply.status(401).send({
          success: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
        });
      }

      if (!user.isActive) {
        return reply.status(403).send({
          success: false,
          error: { code: 'ACCOUNT_DISABLED', message: 'Account is disabled' },
        });
      }

      const valid = await verifyPassword(user.passwordHash, body.password);
      if (!valid) {
        return reply.status(401).send({
          success: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
        });
      }

      await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));

      const tokens = await generateTokens(
        { id: user.id, organizationId: user.organizationId, role: user.role as UserRole },
        request.ip,
        request.headers['user-agent'],
      );

      return reply.status(200).send({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            organizationId: user.organizationId,
          },
          tokens,
        },
      });
    },
  );

  app.post(
    '/register',
    { config: { rateLimit: authRateLimit() } },
    async (request, reply) => {
      const body = registerSchema.parse(request.body);

      const existing = await db.query.users.findFirst({
        where: eq(users.email, body.email),
      });

      if (existing) {
        return reply.status(409).send({
          success: false,
          error: { code: 'EMAIL_EXISTS', message: 'An account with this email already exists' },
        });
      }

      const org = await db.query.organizations.findFirst({
        where: eq(organizations.id, body.organizationId),
      });

      if (!org) {
        return reply.status(400).send({
          success: false,
          error: { code: 'INVALID_ORG', message: 'Organization not found' },
        });
      }

      const passwordHash = await hashPassword(body.password);

      const [newUser] = await db
        .insert(users)
        .values({
          email: body.email,
          passwordHash,
          firstName: body.firstName,
          lastName: body.lastName,
          role: body.role,
          organizationId: body.organizationId,
        })
        .returning();

      if (!newUser) {
        return reply.status(500).send({
          success: false,
          error: { code: 'CREATE_FAILED', message: 'Failed to create user' },
        });
      }

      const tokens = await generateTokens(
        { id: newUser.id, organizationId: newUser.organizationId, role: newUser.role as UserRole },
        request.ip,
        request.headers['user-agent'],
      );

      return reply.status(201).send({
        success: true,
        data: {
          user: {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role,
            organizationId: newUser.organizationId,
          },
          tokens,
        },
      });
    },
  );

  app.post('/refresh', async (request, reply) => {
    const body = refreshTokenSchema.parse(request.body);

    const tokens = await rotateRefreshToken(
      body.refreshToken,
      request.ip,
      request.headers['user-agent'],
    );

    if (!tokens) {
      return reply.status(401).send({
        success: false,
        error: { code: 'INVALID_REFRESH_TOKEN', message: 'Invalid or expired refresh token' },
      });
    }

    return reply.status(200).send({ success: true, data: { tokens } });
  });

  app.post('/logout', { preHandler: [authenticate] }, async (request, reply) => {
    const body = refreshTokenSchema.parse(request.body);
    await revokeRefreshToken(body.refreshToken);
    return reply.status(200).send({ success: true, data: { message: 'Logged out' } });
  });

  app.post(
    '/forgot-password',
    { config: { rateLimit: authRateLimit() } },
    async (request, reply) => {
      const { email } = forgotPasswordSchema.parse(request.body);

      // Always return the same response to prevent user enumeration
      const successResponse = {
        success: true,
        data: { message: 'If that email exists, a reset link has been sent' },
      };

      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user || !user.isActive || user.deletedAt) {
        return reply.status(200).send(successResponse);
      }

      // Generate a cryptographically secure token
      const rawToken = crypto.randomBytes(32).toString('hex');
      const tokenHash = hashResetToken(rawToken);

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // 1-hour expiry

      await db.insert(passwordResetTokens).values({
        userId: user.id,
        tokenHash,
        expiresAt,
      });

      const resetUrl = `${env.WEB_URL}/reset-password?token=${rawToken}`;
      await sendEmail({
        to: user.email,
        subject: 'Reset your SEF-DP password',
        html: passwordResetTemplate(resetUrl, user.firstName),
      });

      return reply.status(200).send(successResponse);
    },
  );

  app.post(
    '/reset-password',
    { config: { rateLimit: authRateLimit() } },
    async (request, reply) => {
      const { token, newPassword } = resetPasswordSchema.parse(request.body);

      const tokenHash = hashResetToken(token);
      const now = new Date();

      const resetRecord = await db.query.passwordResetTokens.findFirst({
        where: and(
          eq(passwordResetTokens.tokenHash, tokenHash),
          isNull(passwordResetTokens.usedAt),
          gt(passwordResetTokens.expiresAt, now),
        ),
        with: { user: true },
      });

      if (!resetRecord) {
        return reply.status(400).send({
          success: false,
          error: { code: 'INVALID_TOKEN', message: 'Invalid or expired reset token' },
        });
      }

      const passwordHash = await hashPassword(newPassword);

      // Update password, mark token used, revoke all sessions atomically
      await Promise.all([
        db.update(users).set({ passwordHash }).where(eq(users.id, resetRecord.userId)),
        db
          .update(passwordResetTokens)
          .set({ usedAt: now })
          .where(eq(passwordResetTokens.id, resetRecord.id)),
        revokeAllUserTokens(resetRecord.userId),
      ]);

      return reply.status(200).send({
        success: true,
        data: { message: 'Password has been reset. Please log in with your new password.' },
      });
    },
  );
}
