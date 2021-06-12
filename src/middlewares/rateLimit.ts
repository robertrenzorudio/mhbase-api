import { MiddlewareFn } from 'type-graphql';
import { Context } from '../types';
import { redis } from '../redis/redis';

// ttl = 1 hour
const ttl = 60 * 60;
export const RateLimit: (limit?: number) => MiddlewareFn<Context> =
  (limit = 50) =>
  async ({ context: { req, res }, info }, next) => {
    const key = `rate-limit:${info.fieldName}:${req.ip}`;
    const reply = await redis.incr(key);
    if (reply > limit) {
      throw new Error('Too many requests, please try again later.');
    } else if (reply === 1) {
      await redis.expire(key, 60);
    }

    return next();
  };
