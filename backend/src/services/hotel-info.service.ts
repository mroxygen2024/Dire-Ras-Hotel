import { prisma } from '../config/database';
import { UpdateHotelInfoInput } from '../validations/hotel-info.validation';

const db = prisma as any;

export class HotelInfoService {
  /**
   * Internal helper to retrieve or initialize the single active hotel record.
   */
  private static async getOrCreateActiveHotel() {
    let hotel = await db.hotelInfo.findFirst({
      where: { isDeleted: false },
      include: { heroSection: true },
    });

    if (!hotel) {
      // Seed default site branding configuration on initial access
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
   * Fetch flattened hotel and hero info for the CMS interface.
   */
  static async getHotelInfo() {
    const hotel = await this.getOrCreateActiveHotel();

    return {
      id: hotel.id,
      name: hotel.name,
      tagline: hotel.tagline,
      phone: hotel.phone,
      phone2: hotel.phone2,
      whatsappNumber: hotel.whatsappNumber,
      email: hotel.email,
      address: hotel.address,
      establishedText: hotel.establishedText,
      logo: hotel.logoUrl,
      mapEmbedUrl: hotel.mapEmbedUrl,
      facebookUrl: hotel.facebookUrl,
      instagramUrl: hotel.instagramUrl,
      twitterUrl: hotel.twitterUrl,
      tripAdvisorUrl: hotel.tripAdvisorUrl,
      heroTitle: hotel.heroSection?.titlePart1 || '',
      heroSubtitle: hotel.heroSection?.subtitle || '',
      heroDescription: hotel.heroSection?.tagline || '',
      updatedAt: hotel.updatedAt,
    };
  }

  /**
   * Transactionally update the hotel info and connected hero section parameters.
   * @param input Validated update payload
   */
  static async updateHotelInfo(input: UpdateHotelInfoInput) {
    const activeHotel = await this.getOrCreateActiveHotel();

    const updatedHotel = await db.$transaction(async (tx: any) => {
      // 1. Update general contact configurations
      await tx.hotelInfo.update({
        where: { id: activeHotel.id },
        data: {
          name: input.name,
          tagline: input.tagline,
          phone: input.phone,
          phone2: input.phone2,
          whatsappNumber: input.whatsappNumber,
          email: input.email,
          address: input.address,
          establishedText: input.establishedText,
          logoUrl: input.logo,
          mapEmbedUrl: input.mapEmbedUrl,
          facebookUrl: input.facebookUrl,
          instagramUrl: input.instagramUrl,
          twitterUrl: input.twitterUrl,
          tripAdvisorUrl: input.tripAdvisorUrl,
        },
      });

      // 2. Update layout parameters inside HeroSection
      if (activeHotel.heroSection) {
        await tx.heroSection.update({
          where: { hotelId: activeHotel.id },
          data: {
            titlePart1: input.heroTitle,
            subtitle: input.heroSubtitle,
            tagline: input.heroDescription,
          },
        });
      } else {
        await tx.heroSection.create({
          data: {
            hotelId: activeHotel.id,
            titlePart1: input.heroTitle,
            subtitle: input.heroSubtitle,
            tagline: input.heroDescription,
            backgroundImage: 'https://example.com/hero.jpg', // Default image fallback
          },
        });
      }

      // Return unified state
      return tx.hotelInfo.findUnique({
        where: { id: activeHotel.id },
        include: { heroSection: true },
      });
    });

    if (!updatedHotel) {
      throw new Error('Failed to update hotel configuration.');
    }

    return {
      id: updatedHotel.id,
      name: updatedHotel.name,
      tagline: updatedHotel.tagline,
      phone: updatedHotel.phone,
      phone2: updatedHotel.phone2,
      whatsappNumber: updatedHotel.whatsappNumber,
      email: updatedHotel.email,
      address: updatedHotel.address,
      establishedText: updatedHotel.establishedText,
      logo: updatedHotel.logoUrl,
      mapEmbedUrl: updatedHotel.mapEmbedUrl,
      facebookUrl: updatedHotel.facebookUrl,
      instagramUrl: updatedHotel.instagramUrl,
      twitterUrl: updatedHotel.twitterUrl,
      tripAdvisorUrl: updatedHotel.tripAdvisorUrl,
      heroTitle: updatedHotel.heroSection?.titlePart1 || '',
      heroSubtitle: updatedHotel.heroSection?.subtitle || '',
      heroDescription: updatedHotel.heroSection?.tagline || '',
      updatedAt: updatedHotel.updatedAt,
    };
  }
}
