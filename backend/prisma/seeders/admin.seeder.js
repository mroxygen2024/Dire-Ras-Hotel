"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = seedAdmin;
const client_1 = require("../../src/generated/prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function seedAdmin(prisma) {
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
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash('admin123', salt);
    const admin = await prisma.admin.create({
        data: {
            email: adminEmail,
            password: hashedPassword,
            firstName: 'Hotel',
            lastName: 'Admin',
            role: client_1.AdminRole.SUPERADMIN,
            isActive: true,
        },
    });
    console.log(`✅ Default admin created successfully:`);
    console.log(`   ├─ Email: ${admin.email}`);
    console.log(`   └─ Password: admin123 (Please change this in production!)`);
}
//# sourceMappingURL=admin.seeder.js.map