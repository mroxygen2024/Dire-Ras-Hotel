import { PrismaClient } from '../../src/generated/prisma/client';
import * as data from '../data/seed-data';

export async function seedRooms(prisma: PrismaClient, hotelId: string): Promise<void> {
  console.log('🌱 Seeding rooms...');

  await Promise.all(
    data.rooms.map((room) =>
      prisma.room.create({
        data: {
          hotelId: hotelId,
          name: room.name,
          price: room.price,
          currency: room.currency,
          image: room.image,
          description: room.description,
          size: room.size,
          occupancy: room.occupancy,
          bed: room.bed,
          features: room.features, // JSON type handles arrays directly
          featured: room.featured,
          isAvailable: true,
        },
      })
    )
  );

  console.log(`✅ ${data.rooms.length} rooms seeded successfully.`);
}
