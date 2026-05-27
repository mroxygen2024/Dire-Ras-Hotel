import { PrismaClient } from '../../src/generated/prisma/client';
import * as data from '../data/seed-data';

export async function seedReviews(prisma: PrismaClient, hotelId: string): Promise<void> {
  console.log('🌱 Seeding reviews and review section...');

  // Create ReviewSection
  const reviewSection = await prisma.reviewSection.create({
    data: {
      hotelId: hotelId,
      badge: data.reviewsData.badge,
      title: data.reviewsData.title,
      subtitle: data.reviewsData.subtitle,
    },
  });

  // Seed individual reviews
  await Promise.all(
    data.reviewsData.reviews.map((review) =>
      prisma.review.create({
        data: {
          hotelId: hotelId,
          reviewSectionId: reviewSection.id,
          name: review.name,
          platform: review.platform,
          text: review.text,
          rating: review.rating,
          isApproved: true,
          isFeatured: true,
        },
      })
    )
  );

  console.log(`✅ ReviewSection and ${data.reviewsData.reviews.length} reviews seeded successfully.`);
}
