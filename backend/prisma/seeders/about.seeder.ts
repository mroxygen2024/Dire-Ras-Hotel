import { PrismaClient } from '../../src/generated/prisma/client';
import * as data from '../data/seed-data';

export async function seedAboutPage(prisma: PrismaClient, hotelId: string): Promise<void> {
  console.log('🌱 Seeding AboutPage, stories, and timeline events...');

  // Create AboutPage record
  const aboutPage = await prisma.aboutPage.create({
    data: {
      hotelId: hotelId,
      title: data.aboutPageData.title,
      subtitle: data.aboutPageData.subtitle,
      mainImageUrl: data.aboutPageData.mainImageUrl,
    },
  });

  // Seed Story Sections
  await Promise.all(
    data.aboutPageData.storySections.map((story, idx) =>
      prisma.storySection.create({
        data: {
          aboutPageId: aboutPage.id,
          title: story.title,
          description: story.description,
          imageUrl: story.imageUrl,
          order: idx,
          alignRight: story.alignRight,
        },
      })
    )
  );

  // Seed Timeline Events
  await Promise.all(
    data.aboutPageData.timeline.map((event, idx) =>
      prisma.timelineEvent.create({
        data: {
          aboutPageId: aboutPage.id,
          year: event.year,
          title: event.title,
          description: event.description,
          order: idx,
        },
      })
    )
  );

  console.log(`✅ AboutPage with ${data.aboutPageData.storySections.length} stories and ${data.aboutPageData.timeline.length} timeline events seeded successfully.`);
}
