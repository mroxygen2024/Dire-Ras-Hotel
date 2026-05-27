import { PrismaClient } from '../../src/generated/prisma/client';
import * as data from '../data/seed-data';

export async function seedServices(prisma: PrismaClient, hotelId: string): Promise<void> {
  console.log('🌱 Seeding hotel services...');

  await Promise.all(
    data.services.map((service, idx) =>
      prisma.service.create({
        data: {
          hotelId: hotelId,
          title: service.title,
          description: service.description,
          icon: service.icon,
          order: idx,
          isAvailable: true,
        },
      })
    )
  );

  console.log(`✅ ${data.services.length} services seeded successfully.`);
}
