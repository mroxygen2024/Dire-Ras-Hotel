import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/custom-error';

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  next(AppError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};
