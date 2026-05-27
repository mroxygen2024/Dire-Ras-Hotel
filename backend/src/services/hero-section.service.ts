import { prisma } from '../config/database';
import { UpdateHeroSectionInput } from '../validations/hero-section.validation';

export class HeroSectionService {
  /**
   * Internal helper to retrieve or initialize the single active hotel record with its HeroSection.
   */
  private static async getOrCreateActiveHotel() {
    let hotel = await prisma.hotelInfo.findFirst({
      where: { isDeleted: false },
      include: { heroSection: true },
    });

    if (!hotel) {
      // Seed default site branding configuration on initial access
      hotel = await prisma.hotelInfo.create({
        data: {
          name: 'Dire Dawa Ras Hotel',
          tagline: 'The Heritage Sensation of Dire Dawa',
          phone: '+251-25-111-3055',
          phone2: '+251-25-111-3056',
          email: 'info@rashotel.com',
          address: 'Ras Desta Damtew St, Dire Dawa, Ethiopia',
          establishedText: 'Established in 1947',
          logoUrl: 'https://example.com/logo.png',
          heroSection: {
            create: {
              titlePart1: 'Welcome to the Royal Palace of Hospitality',
              titlePart2: 'Experience unparalleled elegance',
              subtitle: 'Experience unparalleled elegance and historical prestige.',
              tagline: 'Dire Dawa Ras Hotel stands as an iconic landmark of hospitality, blending historical charm with premium modern comforts.',
              backgroundImage: 'https://example.com/hero.jpg',
            },
          },
        },
        include: { heroSection: true },
      });
    }

    return hotel;
  }

  /**
   * Fetch the Hero Section configuration (Public).
   */
  static async getHeroSection() {
    const hotel = await this.getOrCreateActiveHotel();
    
    if (!hotel.heroSection) {
      return await prisma.heroSection.create({
        data: {
          hotelId: hotel.id,
          titlePart1: 'Welcome to the Royal Palace of Hospitality',
          titlePart2: 'Experience unparalleled elegance',
          subtitle: 'Experience unparalleled elegance and historical prestige.',
          tagline: 'Dire Dawa Ras Hotel stands as an iconic landmark of hospitality, blending historical charm with premium modern comforts.',
          backgroundImage: 'https://example.com/hero.jpg',
        },
      });
    }

    return hotel.heroSection;
  }

  /**
   * Update the Hero Section configuration (Protected Admin).
   * @param input Validated update payload
   */
  static async updateHeroSection(input: UpdateHeroSectionInput) {
    const hotel = await this.getOrCreateActiveHotel();

    return await prisma.heroSection.upsert({
      where: { hotelId: hotel.id },
      create: {
        hotelId: hotel.id,
        badgeText: input.badgeText,
        subtitle: input.subtitle,
        titlePart1: input.titlePart1,
        titlePart2: input.titlePart2,
        tagline: input.tagline,
        ctaBookText: input.ctaBookText,
        ctaVideoText: input.ctaVideoText,
        videoUrl: input.videoUrl,
        backgroundImage: input.backgroundImage,
      },
      update: {
        badgeText: input.badgeText,
        subtitle: input.subtitle,
        titlePart1: input.titlePart1,
        titlePart2: input.titlePart2,
        tagline: input.tagline,
        ctaBookText: input.ctaBookText,
        ctaVideoText: input.ctaVideoText,
        videoUrl: input.videoUrl,
        backgroundImage: input.backgroundImage,
      },
    });
  }
}
