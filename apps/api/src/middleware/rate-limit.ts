import type { RateLimitPluginOptions } from '@fastify/rate-limit';

export function publicRateLimit(): RateLimitPluginOptions {
  return {
    max: 20,
    timeWindow: 60_000,
    keyGenerator: (request) => request.ip,
  };
}

export function authRateLimit(): RateLimitPluginOptions {
  return {
    max: 5,
    timeWindow: 60_000,
    keyGenerator: (request) => request.ip,
  };
}

export function authenticatedRateLimit(): RateLimitPluginOptions {
  return {
    max: 200,
    timeWindow: 60_000,
    keyGenerator: (request) => request.user?.userId ?? request.ip,
  };
}

export function uploadRateLimit(): RateLimitPluginOptions {
  return {
    max: 10,
    timeWindow: 60_000,
    keyGenerator: (request) => request.user?.userId ?? request.ip,
  };
}
