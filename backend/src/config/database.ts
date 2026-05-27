import { PrismaClient } from '../../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { env } from './env';

declare global {
  // Allow global var in development to prevent hot-reloading duplicate instances
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Configure PostgreSQL connection pool using pg
const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

// Configure Prisma 7 driver adapter for PostgreSQL
const adapter = new PrismaPg(pool);

export const prisma =
  global.prisma ||
  new PrismaClient({
    adapter,
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
