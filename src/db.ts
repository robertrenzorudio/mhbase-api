import { PrismaClient } from '@prisma/client';

const prismaOptions: any =
  process.env.NODE_ENV === 'dev' ? { log: ['query'] } : {};

export const prisma = new PrismaClient(prismaOptions);
