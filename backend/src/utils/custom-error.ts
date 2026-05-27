import { ApiError } from './api-error';
import { StatusCodes } from 'http-status-codes';

export class AppError extends ApiError {
  constructor(message: string, statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR, isOperational = true) {
    super(message, statusCode, null, isOperational);
  }
}
