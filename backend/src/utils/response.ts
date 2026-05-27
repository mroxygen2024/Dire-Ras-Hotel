import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export interface ApiResponsePayload<T = any> {
  success: boolean;
  message: string;
  data: T | Record<string, never>;
  [key: string]: any;
}

export class ApiResponse {
  /**
   * Send a standard success API response (status 200 OK by default).
   */
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = StatusCodes.OK,
    extra: Record<string, any> = {}
  ): void {
    const payload: ApiResponsePayload<any> = {
      success: true,
      message,
      data: data !== undefined ? data : {},
      ...extra,
    };
    res.status(statusCode).json(payload);
  }

  /**
   * Send a standard 201 Created API response.
   */
  static created<T>(
    res: Response,
    message: string,
    data?: T,
    extra: Record<string, any> = {}
  ): void {
    this.success(res, message, data, StatusCodes.CREATED, extra);
  }

  /**
   * Send a standard error API response.
   */
  static error(
    res: Response,
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    errors: any = null,
    stack: string | undefined = undefined
  ): void {
    res.status(statusCode).json({
      success: false,
      message,
      ...(errors !== null && errors !== undefined && { errors }),
      ...(stack && { stack }),
    });
  }
}
