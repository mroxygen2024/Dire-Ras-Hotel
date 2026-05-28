import { prisma } from '../config/database';
import {
  UpdateAboutPageInput,
  UpdateHeritageSectionInput,
  UpdateWhyStaySectionInput,
} from '../validations/content.validation';

const db = prisma as any;

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class ContentService {
  private static async getActiveHotel() {
    let hotel = await db.hotelInfo.findFirst({
      where: { isDeleted: false },
    });

    if (!hotel) {
      hotel = await db.hotelInfo.create({
        data: {
          name: 'Dire Dawa Ras Hotel',
          tagline: 'The Heritage Sensation of Dire Dawa',
          phone: '+251-25-111-3055',
          phone2: '+251-25-111-3056',
          email: 'info@rashotel.com',
          address: 'Ras Desta Damtew St, Dire Dawa, Ethiopia',
          establishedText: 'Established in 1947',
          logoUrl: 'https://example.com/logo.png',
        },
      });
    }

    return hotel;
  }

  static async getHeritageSection() {
    const hotel = await this.getActiveHotel();

    let section = await db.heritageSection.findUnique({
      where: { hotelId: hotel.id },
    });

    if (!section) {
      section = await db.heritageSection.create({
        data: {
          hotelId: hotel.id,
          title: 'An Ethiopian Landmark',
          slogan: 'HERITAGE & LEGACY',
          description:
            'Dire Dawa Ras Hotel is a legendary monument of hospitality and timeless cultural heritage.',
          bgImageUrl:
            'https://images.unsplash.com/photo-1670915198844-51975abf6955?q=80&w=2010&auto=format&fit=crop',
        },
      });
    }

    return section;
  }

  static async updateHeritageSection(input: UpdateHeritageSectionInput) {
    const hotel = await this.getActiveHotel();

    return db.heritageSection.upsert({
      where: { hotelId: hotel.id },
      create: {
        hotelId: hotel.id,
        ...input,
      },
      update: {
        ...input,
      },
    });
  }

  static async getAboutPage() {
    const hotel = await this.getActiveHotel();

    let about = await db.aboutPage.findUnique({
      where: { hotelId: hotel.id },
      include: {
        stories: { orderBy: { order: 'asc' } },
        events: { orderBy: { order: 'asc' } },
      },
    });

    if (!about) {
      about = await db.aboutPage.create({
        data: {
          hotelId: hotel.id,
          title: 'Our Timeless Story',
          subtitle: 'Decades of Heritage in Eastern Ethiopia',
          mainImageUrl:
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
          stories: {
            create: [
              {
                title: 'Founded by Royal Decree',
                description:
                  'Established in the mid-20th century, Dire Dawa Ras Hotel became a landmark for regional and international travelers.',
                imageUrl:
                  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
                order: 0,
                alignRight: false,
              },
            ],
          },
          events: {
            create: [
              {
                year: '1945',
                title: 'Foundation Era',
                description: 'Early planning period during the railway expansion age.',
                order: 0,
              },
            ],
          },
        },
        include: {
          stories: { orderBy: { order: 'asc' } },
          events: { orderBy: { order: 'asc' } },
        },
      });
    }

    return about;
  }

  static async updateAboutPage(input: UpdateAboutPageInput) {
    const hotel = await this.getActiveHotel();

    const about = await db.aboutPage.upsert({
      where: { hotelId: hotel.id },
      create: {
        hotelId: hotel.id,
        title: input.title,
        subtitle: input.subtitle,
        mainImageUrl: input.mainImageUrl,
      },
      update: {
        title: input.title,
        subtitle: input.subtitle,
        mainImageUrl: input.mainImageUrl,
      },
    });

    await db.$transaction(async (tx: any) => {
      await tx.storySection.deleteMany({ where: { aboutPageId: about.id } });
      await tx.timelineEvent.deleteMany({ where: { aboutPageId: about.id } });

      if (input.stories.length > 0) {
        await tx.storySection.createMany({
          data: input.stories.map((story, index) => {
            const item: any = {
              aboutPageId: about.id,
              title: story.title,
              description: story.description,
              imageUrl: story.imageUrl,
              order: story.order ?? index,
              alignRight: story.alignRight ?? false,
            };

            if (story.id && UUID_REGEX.test(story.id)) {
              item.id = story.id;
            }

            return item;
          }),
        });
      }

      if (input.events.length > 0) {
        await tx.timelineEvent.createMany({
          data: input.events.map((event, index) => {
            const item: any = {
              aboutPageId: about.id,
              year: event.year,
              title: event.title,
              description: event.description,
              order: event.order ?? index,
            };

            if (event.id && UUID_REGEX.test(event.id)) {
              item.id = event.id;
            }

            return item;
          }),
        });
      }
    });

    return db.aboutPage.findUnique({
      where: { id: about.id },
      include: {
        stories: { orderBy: { order: 'asc' } },
        events: { orderBy: { order: 'asc' } },
      },
    });
  }

  static async getWhyStaySection() {
    const hotel = await this.getActiveHotel();

    let section = await db.whyStaySection.findUnique({
      where: { hotelId: hotel.id },
      include: {
        features: { orderBy: { order: 'asc' } },
      },
    });

    if (!section) {
      section = await db.whyStaySection.create({
        data: {
          hotelId: hotel.id,
          title: 'Why Choose Ras Hotel',
          subtitle: 'OUR PROMISE',
          features: {
            create: [
              {
                icon: 'Map',
                title: 'Prime Landmark Location',
                description:
                  'Located in the heart of Dire Dawa with easy access to historic and commercial centers.',
                order: 0,
              },
              {
                icon: 'Heart',
                title: 'Traditional Hospitality',
                description:
                  'Authentic Ethiopian warmth delivered with professional service standards.',
                order: 1,
              },
            ],
          },
        },
        include: {
          features: { orderBy: { order: 'asc' } },
        },
      });
    }

    return section;
  }

  static async updateWhyStaySection(input: UpdateWhyStaySectionInput) {
    const hotel = await this.getActiveHotel();

    const section = await db.whyStaySection.upsert({
      where: { hotelId: hotel.id },
      create: {
        hotelId: hotel.id,
        title: input.title,
        subtitle: input.subtitle,
      },
      update: {
        title: input.title,
        subtitle: input.subtitle,
      },
    });

    await db.$transaction(async (tx: any) => {
      await tx.whyStayFeature.deleteMany({ where: { whyStaySectionId: section.id } });

      if (input.features.length > 0) {
        await tx.whyStayFeature.createMany({
          data: input.features.map((feature, index) => {
            const item: any = {
              whyStaySectionId: section.id,
              icon: feature.icon,
              title: feature.title,
              description: feature.description,
              order: feature.order ?? index,
            };

            if (feature.id && UUID_REGEX.test(feature.id)) {
              item.id = feature.id;
            }

            return item;
          }),
        });
      }
    });

    return db.whyStaySection.findUnique({
      where: { id: section.id },
      include: {
        features: { orderBy: { order: 'asc' } },
      },
    });
  }
}