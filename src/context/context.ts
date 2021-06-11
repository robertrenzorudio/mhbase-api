import { PrismaClient } from '@prisma/client';

const options: any = process.env.NODE_ENV === 'dev' ? { log: ['query'] } : {};
const prisma = new PrismaClient(options);

export interface Context {
  prisma: PrismaClient;
}

export const context: Context = {
  prisma: prisma,
};
