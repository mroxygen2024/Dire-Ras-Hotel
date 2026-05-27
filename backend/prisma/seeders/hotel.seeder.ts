import { PrismaClient, HotelInfo } from '../../src/generated/prisma/client';
import * as data from '../data/seed-data';

export async function seedHotelInfo(prisma: PrismaClient): Promise<HotelInfo> {
  console.log('🌱 Seeding HotelInfo and core CMS sections...');

  // Create HotelInfo record
  const hotel = await prisma.hotelInfo.create({
    data: {
      name: data.hotelInfo.name,
      tagline: data.hotelInfo.tagline,
      address: data.hotelInfo.address,
      email: data.hotelInfo.email,
      phone: data.hotelInfo.phone,
      phone2: data.hotelInfo.phone2,
      whatsappNumber: data.hotelInfo.whatsappNumber,
      establishedText: data.hotelInfo.establishedText,
      logoUrl: data.hotelInfo.logoUrl,
      mapEmbedUrl: data.hotelInfo.mapEmbedUrl,
      facebookUrl: data.hotelInfo.facebookUrl,
      instagramUrl: data.hotelInfo.instagramUrl,
      twitterUrl: data.hotelInfo.twitterUrl,
      tripAdvisorUrl: data.hotelInfo.tripAdvisorUrl,
    },
  });

  console.log(`✅ HotelInfo seeded: "${hotel.name}" (${hotel.id})`);

  // Create HeroSection
  const hero = await prisma.heroSection.create({
    data: {
      hotelId: hotel.id,
      badgeText: data.heroData.badgeText,
      subtitle: data.heroData.subtitle,
      titlePart1: data.heroData.titlePart1,
      titlePart2: data.heroData.titlePart2,
      tagline: data.heroData.tagline,
      ctaBookText: data.heroData.ctaBookText,
      ctaVideoText: data.heroData.ctaVideoText,
      videoUrl: data.heroData.videoUrl,
      backgroundImage: data.heroData.backgroundImage,
    },
  });
  console.log(`  └─ ✅ HeroSection seeded`);

  // Create HeritageSection
  const heritage = await prisma.heritageSection.create({
    data: {
      hotelId: hotel.id,
      title: data.heritageIntroData.title,
      slogan: data.heritageIntroData.slogan,
      description: data.heritageIntroData.description,
      badgeUrl: data.heritageIntroData.badgeUrl,
      bgImageUrl: data.heritageIntroData.bgImageUrl,
      establishedYear: data.heritageIntroData.establishedYear,
    },
  });
  console.log(`  └─ ✅ HeritageSection seeded`);

  // Create WhyStaySection along with features
  const whyStay = await prisma.whyStaySection.create({
    data: {
      hotelId: hotel.id,
      title: data.whyStayData.title,
      subtitle: data.whyStayData.subtitle,
      features: {
        create: data.whyStayData.features.map((feature, idx) => ({
          title: feature.title,
          description: feature.description,
          icon: feature.icon,
          order: idx,
        })),
      },
    },
  });
  console.log(`  └─ ✅ WhyStaySection and ${data.whyStayData.features.length} Features seeded`);

  // Create ContactPage configuration
  const contactPage = await prisma.contactPage.create({
    data: {
      hotelId: hotel.id,
      title: data.contactPageData.title,
      subtitle: data.contactPageData.subtitle,
      introText: data.contactPageData.introText,
      formTitle: data.contactPageData.formTitle,
      nameLabel: data.contactPageData.nameLabel,
      emailLabel: data.contactPageData.emailLabel,
      phoneLabel: data.contactPageData.phoneLabel,
      msgLabel: data.contactPageData.msgLabel,
      submitBtn: data.contactPageData.submitBtn,
      phone: data.hotelInfo.phone,
      email: data.hotelInfo.email,
      whatsappLink: `https://wa.me/${data.hotelInfo.whatsappNumber.replace(/[^0-9]/g, '')}`,
      latitude: data.contactPageData.latitude,
      longitude: data.contactPageData.longitude,
    },
  });
  console.log(`  └─ ✅ ContactPage config seeded`);

  return hotel;
}
