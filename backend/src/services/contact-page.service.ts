import { prisma } from '../config/database';
import { UpdateContactPageInput } from '../validations/contact-page.validation';

const db = prisma as any;

export class ContactPageService {
  /**
   * Internal helper to retrieve the single active hotel record.
   */
  private static async getActiveHotel() {
    let hotel = await db.hotelInfo.findFirst({
      where: { isDeleted: false },
    });

    if (!hotel) {
      // Seed default hotel if none exists to maintain referential integrity
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

  /**
   * Retrieve or initialize the contact page content.
   */
  private static async getOrCreateContactPage(hotelId: string) {
    let contactPage = await db.contactPage.findUnique({
      where: { hotelId },
    });

    if (!contactPage) {
      contactPage = await db.contactPage.create({
        data: {
          hotelId,
          title: 'Get in Touch',
          subtitle: 'We would love to hear from you',
          introText: 'Have questions about our rooms, services, or historical heritage? Reach out to our hospitality team using the form below.',
          formTitle: 'Send a Message',
          nameLabel: 'Full Name',
          emailLabel: 'Email Address',
          phoneLabel: 'Phone Number',
          msgLabel: 'Your Message',
          submitBtn: 'Send Message',
          description: 'Dire Dawa Ras Hotel stands as an iconic landmark of hospitality, blending historical charm with premium modern comforts.',
          phone: '+251-25-111-3055',
          email: 'info@rashotel.com',
          whatsappLink: 'https://wa.me/251251113055',
          latitude: 9.6009,
          longitude: 41.8601,
        },
      });
    }

    return contactPage;
  }

  /**
   * Fetch contact page configuration context (Public).
   */
  static async getContactPage() {
    const hotel = await this.getActiveHotel();
    return this.getOrCreateContactPage(hotel.id);
  }

  /**
   * Transactionally update the contact page parameters (Protected Admin).
   * @param input Validated update payload
   */
  static async updateContactPage(input: UpdateContactPageInput) {
    const hotel = await this.getActiveHotel();

    const updatedContactPage = await db.$transaction(async (tx: any) => {
      const existing = await tx.contactPage.findUnique({
        where: { hotelId: hotel.id },
      });

      if (existing) {
        return tx.contactPage.update({
          where: { hotelId: hotel.id },
          data: {
            title: input.title,
            subtitle: input.subtitle,
            introText: input.introText,
            formTitle: input.formTitle,
            nameLabel: input.nameLabel,
            emailLabel: input.emailLabel,
            phoneLabel: input.phoneLabel,
            msgLabel: input.msgLabel,
            submitBtn: input.submitBtn,
            description: input.description,
            phone: input.phone,
            email: input.email,
            whatsappLink: input.whatsappLink,
            latitude: input.latitude,
            longitude: input.longitude,
          },
        });
      } else {
        return tx.contactPage.create({
          data: {
            hotelId: hotel.id,
            title: input.title,
            subtitle: input.subtitle,
            introText: input.introText,
            formTitle: input.formTitle,
            nameLabel: input.nameLabel,
            emailLabel: input.emailLabel,
            phoneLabel: input.phoneLabel,
            msgLabel: input.msgLabel,
            submitBtn: input.submitBtn,
            description: input.description,
            phone: input.phone,
            email: input.email,
            whatsappLink: input.whatsappLink,
            latitude: input.latitude,
            longitude: input.longitude,
          },
        });
      }
    });

    return updatedContactPage;
  }
}
