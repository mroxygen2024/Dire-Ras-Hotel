import { prisma } from '../config/database';
import { CreateRoomInput, UpdateRoomInput } from '../validations/room.validation';
import { GetRoomsQueryOptions, PaginatedRoomsResult } from '../types/room.types';
import { AppError } from '../utils/custom-error';
import { Prisma } from '../generated/prisma/client';

export class RoomService {
  /**
   * Internal helper to retrieve the single active hotel record's ID.
   */
  private static async getActiveHotelId(): Promise<string> {
    const hotel = await prisma.hotelInfo.findFirst({
      where: { isDeleted: false },
      select: { id: true },
    });

    if (!hotel) {
      // Create a default hotel record if not exists, to prevent bootstrapping issues.
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
   * Create a new room record (Admin).
   */
  static async createRoom(input: CreateRoomInput) {
    const hotelId = await this.getActiveHotelId();

    const priceDecimal = new Prisma.Decimal(input.price);

    return await prisma.room.create({
      data: {
        hotelId,
        name: input.name,
        price: priceDecimal,
        currency: input.currency,
        image: input.image,
        description: input.description,
        size: input.size,
        occupancy: input.occupancy,
        bed: input.bed,
        features: JSON.stringify(input.features),
        featured: input.featured,
        isAvailable: true,
      },
    });
  }

  /**
   * Update an existing room record (Admin).
   */
  static async updateRoom(roomId: string, input: UpdateRoomInput) {
    // Verify room exists and is not deleted
    const existingRoom = await prisma.room.findFirst({
      where: { id: roomId, isDeleted: false },
    });

    if (!existingRoom) {
      throw AppError.notFound('Room not found or has been deleted.');
    }

    const updateData: any = {};
    if (input.name !== undefined) updateData.name = input.name;
    if (input.price !== undefined) updateData.price = new Prisma.Decimal(input.price);
    if (input.currency !== undefined) updateData.currency = input.currency;
    if (input.image !== undefined) updateData.image = input.image;
    if (input.description !== undefined) updateData.description = input.description;
    if (input.size !== undefined) updateData.size = input.size;
    if (input.occupancy !== undefined) updateData.occupancy = input.occupancy;
    if (input.bed !== undefined) updateData.bed = input.bed;
    if (input.features !== undefined) updateData.features = JSON.stringify(input.features);
    if (input.featured !== undefined) updateData.featured = input.featured;

    return await prisma.room.update({
      where: { id: roomId },
      data: updateData,
    });
  }

  /**
   * Soft delete a room record (Admin).
   */
  static async deleteRoom(roomId: string) {
    const existingRoom = await prisma.room.findFirst({
      where: { id: roomId, isDeleted: false },
    });

    if (!existingRoom) {
      throw AppError.notFound('Room not found or has already been deleted.');
    }

    return await prisma.room.update({
      where: { id: roomId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }

  /**
   * Fetch a single room by ID (Public).
   */
  static async getRoom(roomId: string) {
    const room = await prisma.room.findFirst({
      where: { id: roomId, isDeleted: false },
    });

    if (!room) {
      throw AppError.notFound('Room not found.');
    }

    return {
      ...room,
      features: typeof room.features === 'string' ? JSON.parse(room.features) : room.features,
    };
  }

  /**
   * Fetch all rooms with paginated, filtered, and sorted query options (Public).
   */
  static async getRooms(options: GetRoomsQueryOptions): Promise<PaginatedRoomsResult> {
    const page = Math.max(1, options.page || 1);
    const limit = Math.max(1, Math.min(100, options.limit || 10));
    const skip = (page - 1) * limit;

    const whereClause: any = {
      isDeleted: false,
    };

    // Filter by featured status if explicitly passed
    if (options.featured !== undefined) {
      whereClause.featured = options.featured;
    }

    // Filter by search query (room name or description matching case-insensitive text)
    if (options.search) {
      whereClause.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { description: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    // Determine sorting options
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Run parallel queries for total count and paginated rows
    const [total, rooms] = await Promise.all([
      prisma.room.count({ where: whereClause }),
      prisma.room.findMany({
        where: whereClause,
        orderBy,
        skip,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    // Format features back to array for each room
    const formattedRooms = rooms.map(room => ({
      ...room,
      features: typeof room.features === 'string' ? JSON.parse(room.features) : room.features,
    }));

    return {
      rooms: formattedRooms,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}
