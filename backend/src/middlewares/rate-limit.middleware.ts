import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import { ApiResponse } from '../utils/response';
import { StatusCodes } from 'http-status-codes';

/**
 * Custom handler to return standardized API responses when rate limit is exceeded.
 */
const rateLimitHandler = (req: Request, res: Response, next: NextFunction, options: any) => {
  ApiResponse.error(
    res,
    options.message || 'Too many requests from this IP. Please try again later.',
    StatusCodes.TOO_MANY_REQUESTS
  );
};

/**
 * General rate limiter applied to all API endpoints to protect against DoS.
 */
export const apiLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS, // e.g. 15 minutes
  max: env.RATE_LIMIT_MAX, // e.g. max 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP. Please try again in 15 minutes.',
  handler: rateLimitHandler,
});

/**
 * Stricter rate limiter for authentication routes (login, credentials, etc.)
 * to prevent brute-force attacks.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many login attempts from this IP. Please try again after 15 minutes.',
  handler: rateLimitHandler,
});
