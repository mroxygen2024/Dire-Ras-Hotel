import { prisma } from '../config/database';
import { PasswordUtil } from '../utils/password';
import { JwtUtil } from '../utils/jwt';
import { AppError } from '../utils/custom-error';
import { AdminRole } from '../generated/prisma/client';

export class AuthService {
  /**
   * Log in an administrator, verifying credentials and returning a token.
   * @param email Admin email
   * @param password Admin password
   */
  static async login(email: string, password: string) {
    if (!email || !password) {
      throw AppError.badRequest('Please provide both email and password.');
    }

    // Find active administrator
    const admin = await prisma.admin.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        isDeleted: false,
      },
    });

    // Verify user credentials
    if (!admin || !(await PasswordUtil.compare(password, admin.password))) {
      throw AppError.unauthorized('Incorrect email or password.');
    }

    // Ensure account is active
    if (!admin.isActive) {
      throw AppError.forbidden('Your account is currently inactive. Please contact a Super Admin.');
    }

    // Generate access token
    const token = JwtUtil.sign({
      userId: admin.id,
      email: admin.email,
      role: admin.role,
    });

    return {
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        firstName: admin.firstName,
        lastName: admin.lastName,
      },
      token,
    };
  }

  /**
   * Seed a default Super Admin if no active admin accounts exist in the database.
   */
  static async seedSuperAdmin(): Promise<void> {
    const adminCount = await prisma.admin.count({ where: { isDeleted: false } });
    
    if (adminCount === 0) {
      const defaultEmail = 'admin@rashotel.com';
      const defaultPassword = 'admin123';
      const hashedPassword = await PasswordUtil.hash(defaultPassword);

      await prisma.admin.create({
        data: {
          email: defaultEmail,
          password: hashedPassword,
          firstName: 'Ras',
          lastName: 'SuperAdmin',
          role: AdminRole.SUPERADMIN,
          isActive: true,
        },
      });

      console.log('🌱 Seeded default Super Admin account:');
      console.log(`   📧 Email: ${defaultEmail}`);
      console.log(`   🔑 Password: ${defaultPassword}`);
    }
  }
}
