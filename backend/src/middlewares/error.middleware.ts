import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { ApiError } from '../utils/api-error';
import { ApiResponse } from '../utils/response';
import { env } from '../config/env';

export const errorMiddleware: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong on our end. Please try again later.';
  let errors: any = null;
  let isOperational = false;

  // 1. Handle Custom ApiError / AppError exceptions
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
    isOperational = err.isOperational;
  }

  // 2. Handle Zod validation errors
  else if (err instanceof ZodError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Validation failed. Please verify your input parameters.';
    isOperational = true;
    
    const fieldErrors: Record<string, string[]> = {};
    err.issues.forEach((issue: any) => {
      const fieldPath = issue.path.join('.') || 'body';
      if (!fieldErrors[fieldPath]) {
        fieldErrors[fieldPath] = [];
      }
      fieldErrors[fieldPath].push(issue.message);
    });
    errors = fieldErrors;
  }

  // 3. Handle Prisma Database Exceptions
  else if (err.name === 'PrismaClientKnownRequestError') {
    isOperational = true;
    switch (err.code) {
      case 'P2002': {
        statusCode = StatusCodes.CONFLICT; // 409 Conflict
        const targetField = err.meta?.target;
        const fieldName = Array.isArray(targetField) ? targetField.join('_') : targetField || 'field';
        message = `A duplicate record was found. The value for '${fieldName}' must be unique.`;
        errors = {
          [fieldName]: [`This value is already in use.`]
        };
        break;
      }
      case 'P2025': {
        statusCode = StatusCodes.NOT_FOUND; // 404 Not Found
        message = err.meta?.cause || 'The requested record could not be found or has been deleted.';
        break;
      }
      case 'P2003': {
        statusCode = StatusCodes.BAD_REQUEST; // 400 Bad Request
        const foreignKey = err.meta?.field_name || 'relationship';
        message = `Database relationship constraint violation. A related record was not found or is still referenced.`;
        errors = {
          [foreignKey]: [`Foreign key relationship failed.`]
        };
        break;
      }
      default: {
        statusCode = StatusCodes.BAD_REQUEST;
        message = `Database operation failed: ${err.message}`;
        break;
      }
    }
  } else if (err.name === 'PrismaClientValidationError') {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Database schema validation failed. Please check the integrity of your request fields.';
    isOperational = true;
  } else if (err.name?.startsWith('PrismaClient')) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = 'An unexpected database error occurred.';
    isOperational = false;
  }

  // 4. Handle JWT & Authorization exceptions
  else if (err.name === 'JsonWebTokenError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Invalid authentication token. Please log in again.';
    isOperational = true;
  } else if (err.name === 'TokenExpiredError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Your authentication session has expired. Please log in again.';
    isOperational = true;
  }

  // 5. Handle generic Node/Express Error exceptions
  else if (err instanceof Error) {
    message = err.message;
  }

  // Log error details for the system administrator
  if (env.NODE_ENV === 'development') {
    console.error(`💥 Error [${req.method} ${req.url}]:`, err);
  } else {
    console.error(`💥 Error [${req.method} ${req.url}]: ${message} (Operational: ${isOperational})`);
  }

  // Generate standardized error response
  ApiResponse.error(
    res,
    message,
    statusCode,
    errors,
    env.NODE_ENV === 'development' ? err.stack : undefined
  );
};
