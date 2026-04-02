import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  API_PORT: z.coerce.number().default(3001),
  API_HOST: z.string().default('0.0.0.0'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

  DATABASE_URL: z.string().url(),

  REDIS_URL: z.string().url(),

  JWT_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  CORS_ORIGINS: z.string().default('http://localhost:3000'),

  WEB_URL: z.string().url().default('http://localhost:3000'),

  RATE_LIMIT_MAX: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60_000),

  MINIO_ENDPOINT: z.string().default('localhost'),
  MINIO_PORT: z.coerce.number().default(9000),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_SECRET_KEY: z.string(),
  MINIO_USE_SSL: z
    .string()
    .transform((v) => v === 'true')
    .default('false'),
  MINIO_BUCKET: z.string().default('sefdp-documents'),

  RESEND_API_KEY: z.string().default(''),
  RESEND_FROM_EMAIL: z.string().email().default('noreply@sefdp.com'),

  // Optional — required when webhook endpoints are active
  WEBHOOK_SECRET: z.string().min(32).optional(),
});

const WEAK_VALUES = new Set(['changeme', 'password', 'secret', 'admin', '12345678', 'sefdp_dev']);

function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const formatted = result.error.flatten().fieldErrors;
    const missing = Object.entries(formatted)
      .map(([key, errors]) => `  ${key}: ${(errors ?? []).join(', ')}`)
      .join('\n');

    console.error('Invalid environment variables:\n' + missing);
    process.exit(1);
  }

  const data = result.data;

  // Production hardening: reject weak secrets
  if (data.NODE_ENV === 'production') {
    const weakSecrets = (
      [
        'POSTGRES_PASSWORD',
        'REDIS_PASSWORD',
        'MINIO_ROOT_PASSWORD',
        'JWT_SECRET',
      ] as const
    ).filter((key) => {
      const val = process.env[key];
      return !val || val.length < 16 || WEAK_VALUES.has(val.toLowerCase());
    });

    if (weakSecrets.length > 0) {
      console.error(
        `Weak or missing secrets detected in production: ${weakSecrets.join(', ')}\n` +
          'Each secret must be at least 16 characters and not a default/placeholder value.',
      );
      process.exit(1);
    }
  }

  return data;
}

export const env = validateEnv();

export type Env = z.infer<typeof envSchema>;
