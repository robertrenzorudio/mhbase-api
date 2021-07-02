import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Redis } from 'ioredis';

export default interface Context {
  prisma: PrismaClient;
  redis: Redis;
  req: Request;
  res: Response;
}
