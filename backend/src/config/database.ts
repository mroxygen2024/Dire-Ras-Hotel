import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { env } from './env';

declare global {
  // Allow global var in development to prevent hot-reloading duplicate instances
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Configure PostgreSQL connection pool using pg with production-ready security parameters
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  // Limit concurrent connections to protect database resources
  max: env.NODE_ENV === 'production' ? 20 : 5, 
  // Close idle clients after 30 seconds to release memory and resources
  idleTimeoutMillis: 30000, 
  // Fail fast (5 seconds) if database is unreachable, avoiding hanging requests
  connectionTimeoutMillis: 5000, 
  // Periodically recycle database connections to prevent memory/resource leaks
  maxUses: 5000, 
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
