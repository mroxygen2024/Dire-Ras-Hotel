import { AdminRole } from '../generated/prisma/client';

export interface AuthUser {
  id: string;
  email: string;
  role: AdminRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
