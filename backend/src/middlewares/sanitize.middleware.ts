import { Request, Response, NextFunction } from 'express';

/**
 * Clean a string by removing potential XSS tags, scripts, and converting dangerous characters.
 */
export function sanitizeString(val: string): string {
  if (typeof val !== 'string') return val;

  return val
    // Remove script tags and their content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove on* event handlers (like onload, onerror, onclick) inside HTML tags
    .replace(/on\w+\s*=\s*(['"][^'"]*['"]|[^\s>]+(?=\s|>))/gi, '')
    // Remove javascript: pseudo-protocol URIs
    .replace(/javascript\s*:\s*[^;'">\s]+/gi, '')
    // Remove HTML tags to prevent general markup injection, but preserve text content
    .replace(/<[^>]*>/g, '')
    // Trim leading/trailing whitespace
    .trim();
}

/**
 * Recursively sanitize objects, arrays, or primitive values.
 */
export function sanitizeData(data: any): any {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'string') {
    return sanitizeString(data);
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item));
  }

  if (typeof data === 'object') {
    const sanitizedObj: Record<string, any> = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        sanitizedObj[key] = sanitizeData(data[key]);
      }
    }
    return sanitizedObj;
  }

  return data;
}

/**
 * Express middleware to sanitize incoming request bodies, queries, and params against XSS/HTML injection.
 */
export const sanitizeMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body) {
    req.body = sanitizeData(req.body);
  }
  if (req.query) {
    Object.assign(req.query as Record<string, unknown>, sanitizeData(req.query));
  }
  if (req.params) {
    Object.assign(req.params as Record<string, unknown>, sanitizeData(req.params));
  }
  next();
};
