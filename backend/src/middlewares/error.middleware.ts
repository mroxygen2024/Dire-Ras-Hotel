import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/custom-error';
import { env } from '../config/env';

export const errorMiddleware: ErrorRequestHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong';
  let success = false;
  let errors: any = null;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  // Handle Prisma Database Errors
  if (err.name?.startsWith('PrismaClient')) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Database operation failed';
    if (env.NODE_ENV === 'development') {
      errors = err.stack;
    }
  }

  // Log error details
  if (env.NODE_ENV === 'development') {
    console.error(`💥 Error [${req.method} ${req.url}]:`, err);
  } else {
    console.error(`💥 Error [${req.method} ${req.url}]: ${message}`);
  }

  res.status(statusCode).json({
    success,
    message,
    ...(errors && { errors }),
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
