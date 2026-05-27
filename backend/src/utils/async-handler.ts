import { Request, Response, NextFunction } from 'express';

export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any> | any;

/**
 * Catches any unhandled promise rejections in controller operations and forwards them to the global error middleware.
 */
export const asyncHandler = (fn: AsyncRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
