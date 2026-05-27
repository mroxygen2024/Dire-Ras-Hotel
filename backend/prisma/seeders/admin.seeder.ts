import { PrismaClient, AdminRole } from '../../src/generated/prisma/client';
import bcrypt from 'bcryptjs';

export async function seedAdmin(prisma: PrismaClient): Promise<void> {
  console.log('🌱 Seeding default Admin user...');

  const adminEmail = 'admin@rashotel.com';
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`ℹ️ Admin user "${adminEmail}" already exists. Skipping.`);
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);

  const admin = await prisma.admin.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      firstName: 'Hotel',
      lastName: 'Admin',
      role: AdminRole.SUPERADMIN,
      isActive: true,
    },
  });

  console.log(`✅ Default admin created successfully:`);
  console.log(`   ├─ Email: ${admin.email}`);
  console.log(`   └─ Password: admin123 (Please change this in production!)`);
}
