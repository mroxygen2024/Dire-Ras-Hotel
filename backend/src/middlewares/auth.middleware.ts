import { Request, Response, NextFunction } from 'express';
import { JwtUtil } from '../utils/jwt';
import { AppError } from '../utils/custom-error';
import { prisma } from '../config/database';
import { AdminRole } from '../generated/prisma/client';
import { asyncHandler } from '../utils/async-handler';

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // 1. Extract Bearer Token from headers
  let token: string | undefined;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(AppError.unauthorized('Authentication required. Please provide a Bearer token.'));
  }

  // 2. Verify token validity
  let decodedPayload;
  try {
    decodedPayload = JwtUtil.verify(token);
  } catch (err) {
    return next(AppError.unauthorized('Invalid or expired token. Please log in again.'));
  }

  // 3. Ensure target administrator still exists and is active
  const currentUser = await prisma.admin.findFirst({
    where: {
      id: decodedPayload.userId,
      isDeleted: false,
      isActive: true,
    },
  });

  if (!currentUser) {
    return next(AppError.unauthorized('The administrator account has been deleted or deactivated.'));
  }

  // 4. Attach verified administrator details to request context
  req.user = {
    id: currentUser.id,
    email: currentUser.email,
    role: currentUser.role,
  };

  next();
});

/**
 * Restricts access to specific administrative roles.
 * @param roles Permitted admin roles
 */
export const restrictTo = (...roles: AdminRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(AppError.unauthorized('Authentication is required.'));
    }

    if (!roles.includes(req.user.role)) {
      return next(AppError.forbidden('Forbidden. You do not have permission to perform this action.'));
    }

    next();
  };
};
