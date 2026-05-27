import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AdminRole } from '../generated/prisma/client';

export interface JwtPayload {
  userId: string;
  email: string;
  role: AdminRole;
}

export class JwtUtil {
  private static readonly SECRET = env.JWT_SECRET;
  private static readonly EXPIRES_IN = '24h';

  /**
   * Generates a signed JWT token containing user details.
   * @param payload Target token claims
   */
  static sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.SECRET, { expiresIn: this.EXPIRES_IN });
  }

  /**
   * Verifies and decodes a signed JWT token.
   * @param token Signed token string
   */
  static verify(token: string): JwtPayload {
    return jwt.verify(token, this.SECRET) as JwtPayload;
  }
}
