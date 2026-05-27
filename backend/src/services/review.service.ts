// Trivial change to force TS server cache invalidation and reload updated Prisma Client types
import { prisma } from '../config/database';
import { CreateReviewInput, UpdateReviewInput, UpdateReviewSectionInput } from '../validations/review.validation';
import { AppError } from '../utils/custom-error';

export class ReviewService {
  /**
   * Internal helper to retrieve the single active hotel record's ID.
   */
  private static async getActiveHotelId(): Promise<string> {
    const hotel = await prisma.hotelInfo.findFirst({
      where: { isDeleted: false },
      select: { id: true },
    });

    if (!hotel) {
      const defaultHotel = await prisma.hotelInfo.create({
        data: {
          name: 'Dire Dawa Ras Hotel',
          tagline: 'The Heritage Sensation of Dire Dawa',
          phone: '+251-25-111-3055',
          email: 'info@rashotel.com',
          address: 'Ras Desta Damtew St, Dire Dawa, Ethiopia',
        },
        select: { id: true },
      });
      return defaultHotel.id;
    }

    return hotel.id;
  }

  /**
   * Internal helper to retrieve or initialize the review section configuration.
   */
  private static async getOrCreateReviewSection(hotelId: string) {
    let section = await prisma.reviewSection.findFirst({
      where: { hotelId },
    });

    if (!section) {
      section = await prisma.reviewSection.create({
        data: {
          hotelId,
          badge: 'GUEST STORIES',
          title: 'What Our Guests Say',
          subtitle: 'Loved and trusted by generations of local and international travelers in Dire Dawa.',
        },
      });
    }

    return section;
  }

  /**
   * Public: Fetch review section content and all approved reviews.
   */
  static async getPublicReviews() {
    const hotelId = await this.getActiveHotelId();
    const section = await this.getOrCreateReviewSection(hotelId);

    const reviews = await prisma.review.findMany({
      where: {
        hotelId,
        isApproved: true,
        isDeleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      badge: section.badge,
      title: section.title,
      subtitle: section.subtitle,
      reviews: reviews.map((r) => ({
        id: r.id,
        name: r.name,
        platform: r.platform,
        text: r.text,
        rating: r.rating,
        createdAt: r.createdAt,
      })),
    };
  }

  /**
   * Admin: Get all reviews (approved & unapproved) for the dashboard.
   */
  static async getAllReviews() {
    const hotelId = await this.getActiveHotelId();
    return await prisma.review.findMany({
      where: {
        hotelId,
        isDeleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Admin: Get a single review.
   */
  static async getReview(reviewId: string) {
    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
        isDeleted: false,
      },
    });

    if (!review) {
      throw AppError.notFound('Review not found.');
    }

    return review;
  }

  /**
   * Admin: Get review section configuration.
   */
  static async getReviewSection() {
    const hotelId = await this.getActiveHotelId();
    return await this.getOrCreateReviewSection(hotelId);
  }

  /**
   * Admin: Create a new review.
   */
  static async createReview(input: CreateReviewInput) {
    const hotelId = await this.getActiveHotelId();
    const section = await this.getOrCreateReviewSection(hotelId);

    return await prisma.review.create({
      data: {
        hotelId,
        reviewSectionId: section.id,
        name: input.name,
        platform: input.platform || 'Google Review',
        text: input.text,
        rating: input.rating,
        isApproved: input.isApproved !== undefined ? input.isApproved : true,
        isFeatured: input.isFeatured !== undefined ? input.isFeatured : false,
      },
    });
  }

  /**
   * Admin: Update an existing review.
   */
  static async updateReview(reviewId: string, input: UpdateReviewInput) {
    const existingReview = await prisma.review.findFirst({
      where: { id: reviewId, isDeleted: false },
    });

    if (!existingReview) {
      throw AppError.notFound('Review not found or has been deleted.');
    }

    return await prisma.review.update({
      where: { id: reviewId },
      data: {
        name: input.name !== undefined ? input.name : undefined,
        platform: input.platform !== undefined ? input.platform : undefined,
        text: input.text !== undefined ? input.text : undefined,
        rating: input.rating !== undefined ? input.rating : undefined,
        isApproved: input.isApproved !== undefined ? input.isApproved : undefined,
        isFeatured: input.isFeatured !== undefined ? input.isFeatured : undefined,
      },
    });
  }

  /**
   * Admin: Soft delete a review.
   */
  static async deleteReview(reviewId: string) {
    const existingReview = await prisma.review.findFirst({
      where: { id: reviewId, isDeleted: false },
    });

    if (!existingReview) {
      throw AppError.notFound('Review not found or has already been deleted.');
    }

    return await prisma.review.update({
      where: { id: reviewId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }

  /**
   * Admin: Update review section headers (badge, title, subtitle).
   */
  static async updateReviewSection(input: UpdateReviewSectionInput) {
    const hotelId = await this.getActiveHotelId();
    const section = await this.getOrCreateReviewSection(hotelId);

    return await prisma.reviewSection.update({
      where: { id: section.id },
      data: {
        badge: input.badge !== undefined ? input.badge : undefined,
        title: input.title !== undefined ? input.title : undefined,
        subtitle: input.subtitle !== undefined ? input.subtitle : undefined,
      },
    });
  }
}
