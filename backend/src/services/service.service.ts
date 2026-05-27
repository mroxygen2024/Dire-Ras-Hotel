import { prisma } from '../config/database';
import { CreateServiceInput, UpdateServiceInput } from '../validations/service.validation';
import { AppError } from '../utils/custom-error';

export class ServiceService {
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
   * Create a new service (Admin).
   */
  static async createService(input: CreateServiceInput) {
    const hotelId = await this.getActiveHotelId();

    return await prisma.service.create({
      data: {
        hotelId,
        title: input.title,
        description: input.description,
        icon: input.icon,
        order: input.order,
        isAvailable: true,
      },
    });
  }

  /**
   * Update an existing service (Admin).
   */
  static async updateService(serviceId: string, input: UpdateServiceInput) {
    const existingService = await prisma.service.findFirst({
      where: { id: serviceId, isDeleted: false },
    });

    if (!existingService) {
      throw AppError.notFound('Service not found or has been deleted.');
    }

    return await prisma.service.update({
      where: { id: serviceId },
      data: {
        title: input.title !== undefined ? input.title : undefined,
        description: input.description !== undefined ? input.description : undefined,
        icon: input.icon !== undefined ? input.icon : undefined,
        order: input.order !== undefined ? input.order : undefined,
      },
    });
  }

  /**
   * Soft delete a service (Admin).
   */
  static async deleteService(serviceId: string) {
    const existingService = await prisma.service.findFirst({
      where: { id: serviceId, isDeleted: false },
    });

    if (!existingService) {
      throw AppError.notFound('Service not found or has already been deleted.');
    }

    return await prisma.service.update({
      where: { id: serviceId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }

  /**
   * Fetch a single service by ID (Public).
   */
  static async getService(serviceId: string) {
    const service = await prisma.service.findFirst({
      where: { id: serviceId, isDeleted: false },
    });

    if (!service) {
      throw AppError.notFound('Service not found.');
    }

    return service;
  }

  /**
   * Fetch all services sorted by order (Public).
   */
  static async getServices() {
    return await prisma.service.findMany({
      where: { isDeleted: false },
      orderBy: { order: 'asc' },
    });
  }
}
