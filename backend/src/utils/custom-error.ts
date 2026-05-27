import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string): AppError {
    return new AppError(message, StatusCodes.BAD_REQUEST);
  }

  static unauthorized(message: string): AppError {
    return new AppError(message, StatusCodes.UNAUTHORIZED);
  }

  static forbidden(message: string): AppError {
    return new AppError(message, StatusCodes.FORBIDDEN);
  }

  static notFound(message: string): AppError {
    return new AppError(message, StatusCodes.NOT_FOUND);
  }

  static internal(message: string): AppError {
    return new AppError(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
