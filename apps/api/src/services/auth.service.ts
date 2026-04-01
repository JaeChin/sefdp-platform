import argon2 from 'argon2';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { eq, and, isNull } from 'drizzle-orm';
import crypto from 'node:crypto';
import type { TokenPayload, UserRole } from '@sefdp/shared';
import { env } from '../env.js';
import { db } from '../db/index.js';
import { users } from '../db/schema/users.js';
import { refreshTokens } from '../db/schema/refresh-tokens.js';

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  });
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  return argon2.verify(hash, password);
}

export function generateAccessToken(payload: {
  userId: string;
  organizationId: string;
  role: UserRole;
}): string {
  return jwt.sign(
    {
      userId: payload.userId,
      organizationId: payload.organizationId,
      role: payload.role,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_ACCESS_EXPIRES_IN } as SignOptions,
  );
}

function generateRefreshTokenString(): string {
  return crypto.randomBytes(64).toString('base64url');
}

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function generateTokens(
  user: { id: string; organizationId: string; role: UserRole },
  ipAddress?: string,
  userAgent?: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const accessToken = generateAccessToken({
    userId: user.id,
    organizationId: user.organizationId,
    role: user.role,
  });

  const refreshTokenStr = generateRefreshTokenString();
  const tokenHash = hashToken(refreshTokenStr);

  const expiresAt = new Date();
  const days = parseInt(env.JWT_REFRESH_EXPIRES_IN.replace('d', ''), 10) || 7;
  expiresAt.setDate(expiresAt.getDate() + days);

  await db.insert(refreshTokens).values({
    userId: user.id,
    tokenHash,
    expiresAt,
    ipAddress: ipAddress ?? null,
    userAgent: userAgent ?? null,
  });

  return { accessToken, refreshToken: refreshTokenStr };
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
}

export async function rotateRefreshToken(
  oldToken: string,
  ipAddress?: string,
  userAgent?: string,
): Promise<{ accessToken: string; refreshToken: string } | null> {
  const oldHash = hashToken(oldToken);

  const stored = await db.query.refreshTokens.findFirst({
    where: and(eq(refreshTokens.tokenHash, oldHash), isNull(refreshTokens.revokedAt)),
    with: { user: true },
  });

  if (!stored || stored.expiresAt < new Date()) {
    return null;
  }

  await db
    .update(refreshTokens)
    .set({ revokedAt: new Date() })
    .where(eq(refreshTokens.id, stored.id));

  const user = await db.query.users.findFirst({
    where: eq(users.id, stored.userId),
  });

  if (!user || !user.isActive) return null;

  return generateTokens(
    { id: user.id, organizationId: user.organizationId, role: user.role as UserRole },
    ipAddress,
    userAgent,
  );
}

export async function revokeRefreshToken(token: string): Promise<void> {
  const tokenHash = hashToken(token);
  await db
    .update(refreshTokens)
    .set({ revokedAt: new Date() })
    .where(eq(refreshTokens.tokenHash, tokenHash));
}

export async function revokeAllUserTokens(userId: string): Promise<void> {
  await db
    .update(refreshTokens)
    .set({ revokedAt: new Date() })
    .where(and(eq(refreshTokens.userId, userId), isNull(refreshTokens.revokedAt)));
}
