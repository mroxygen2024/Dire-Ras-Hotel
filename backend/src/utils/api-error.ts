import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errors: any;

  constructor(
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    errors: any = null,
    isOperational = true,
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(message: string, errors: any = null): ApiError {
    return new ApiError(message, StatusCodes.BAD_REQUEST, errors, true);
  }

  static unauthorized(message: string = 'Unauthorized access'): ApiError {
    return new ApiError(message, StatusCodes.UNAUTHORIZED, null, true);
  }

  static forbidden(message: string = 'Forbidden. You do not have permission to perform this action.'): ApiError {
    return new ApiError(message, StatusCodes.FORBIDDEN, null, true);
  }

  static notFound(message: string = 'Resource not found'): ApiError {
    return new ApiError(message, StatusCodes.NOT_FOUND, null, true);
  }

  static internal(message: string = 'Internal server error'): ApiError {
    return new ApiError(message, StatusCodes.INTERNAL_SERVER_ERROR, null, false);
  }
}
