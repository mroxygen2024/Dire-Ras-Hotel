"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = __importDefault(require("node:process"));
const database_1 = require("../src/config/database");
const hotel_seeder_1 = require("./seeders/hotel.seeder");
const about_seeder_1 = require("./seeders/about.seeder");
const services_seeder_1 = require("./seeders/services.seeder");
const rooms_seeder_1 = require("./seeders/rooms.seeder");
const reviews_seeder_1 = require("./seeders/reviews.seeder");
const admin_seeder_1 = require("./seeders/admin.seeder");
async function main() {
    console.log('🚀 Starting database seeding...');
    const isReset = node_process_1.default.argv.includes('--reset');
    if (isReset) {
        console.log('🧹 Reset option enabled. Cleaning database records...');
        // Deleting HotelInfo cascades to all other sections (Hero, Heritage, AboutPage, WhyStay, Services, Rooms, Reviews, ContactPage)
        const deletedHotelCount = await database_1.prisma.hotelInfo.deleteMany();
        console.log(`🗑️  Deleted ${deletedHotelCount.count} HotelInfo records (along with cascaded dependents).`);
        // Clear Admins
        const deletedAdminCount = await database_1.prisma.admin.deleteMany();
        console.log(`🗑️  Deleted ${deletedAdminCount.count} Admin records.`);
        console.log('✨ Database reset complete.');
    }
    // 1. Seed Core HotelInfo and 1-to-1 sections
    const hotel = await (0, hotel_seeder_1.seedHotelInfo)(database_1.prisma);
    // 2. Seed Admin User
    await (0, admin_seeder_1.seedAdmin)(database_1.prisma);
    // 3. Seed About Page
    await (0, about_seeder_1.seedAboutPage)(database_1.prisma, hotel.id);
    // 4. Seed Services
    await (0, services_seeder_1.seedServices)(database_1.prisma, hotel.id);
    // 5. Seed Rooms
    await (0, rooms_seeder_1.seedRooms)(database_1.prisma, hotel.id);
    // 6. Seed Reviews
    await (0, reviews_seeder_1.seedReviews)(database_1.prisma, hotel.id);
    console.log('\n🎉 Database seeding completed successfully! All systems are ready.');
}
main()
    .catch((e) => {
    console.error('❌ Error during seeding process:', e);
    node_process_1.default.exit(1);
})
    .finally(async () => {
    await database_1.prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map