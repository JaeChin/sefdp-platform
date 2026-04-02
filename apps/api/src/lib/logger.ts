import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  redact: {
    paths: [
      'password',
      'passwordHash',
      'newPassword',
      'req.headers.authorization',
      'req.headers.cookie',
      'refreshToken',
      'accessToken',
      'token',
      'tokenHash',
      // User PII
      'body.email',
      'body.token',
      'body.newPassword',
      // Infrastructure credentials
      'minio_access_key',
      'minio_secret_key',
      'MINIO_ROOT_USER',
      'MINIO_ROOT_PASSWORD',
    ],
    censor: '[REDACTED]',
  },
  transport:
    process.env.NODE_ENV !== 'production'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err,
  },
});
