import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

const envSchema = z.object({
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
  DATABASE_URL: z.string().min(1, { message: 'DATABASE_URL is required' }),
  JWT_SECRET: z.string().min(8, { message: 'JWT_SECRET must be at least 8 characters long' }),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  ALLOWED_ORIGINS: z.string().default('*'),
  JWT_EXPIRES_IN: z.string().default('24h'),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000').transform((val) => parseInt(val, 10)), // 15 mins default
  RATE_LIMIT_MAX: z.string().default('100').transform((val) => parseInt(val, 10)), // 100 requests per window default
});

const envParseResult = envSchema.safeParse(process.env);

if (!envParseResult.success) {
  console.error('❌ Invalid environment variables:');
  console.error(JSON.stringify(envParseResult.error.format(), null, 2));
  process.exit(1);
}

// In production, warn if ALLOWED_ORIGINS is wildcard
if (envParseResult.data.NODE_ENV === 'production' && envParseResult.data.ALLOWED_ORIGINS === '*') {
  console.warn('⚠️ WARNING: ALLOWED_ORIGINS is set to "*" in production! It is highly recommended to specify trusted domains.');
}

export const env = envParseResult.data;

