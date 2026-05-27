import process from 'node:process';
import { prisma } from '../src/config/database';
import { seedHotelInfo } from './seeders/hotel.seeder';
import { seedAboutPage } from './seeders/about.seeder';
import { seedServices } from './seeders/services.seeder';
import { seedRooms } from './seeders/rooms.seeder';
import { seedReviews } from './seeders/reviews.seeder';
import { seedAdmin } from './seeders/admin.seeder';


async function main() {
  console.log('🚀 Starting database seeding...');
  
  const isReset = process.argv.includes('--reset');

  if (isReset) {
    console.log('🧹 Reset option enabled. Cleaning database records...');
    
    // Deleting HotelInfo cascades to all other sections (Hero, Heritage, AboutPage, WhyStay, Services, Rooms, Reviews, ContactPage)
    const deletedHotelCount = await prisma.hotelInfo.deleteMany();
    console.log(`🗑️  Deleted ${deletedHotelCount.count} HotelInfo records (along with cascaded dependents).`);
    
    // Clear Admins
    const deletedAdminCount = await prisma.admin.deleteMany();
    console.log(`🗑️  Deleted ${deletedAdminCount.count} Admin records.`);
    
    console.log('✨ Database reset complete.');
  }

  // 1. Seed Core HotelInfo and 1-to-1 sections
  const hotel = await seedHotelInfo(prisma);

  // 2. Seed Admin User
  await seedAdmin(prisma);

  // 3. Seed About Page
  await seedAboutPage(prisma, hotel.id);

  // 4. Seed Services
  await seedServices(prisma, hotel.id);

  // 5. Seed Rooms
  await seedRooms(prisma, hotel.id);

  // 6. Seed Reviews
  await seedReviews(prisma, hotel.id);

  console.log('\n🎉 Database seeding completed successfully! All systems are ready.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding process:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
