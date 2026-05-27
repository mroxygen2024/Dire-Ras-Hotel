import { Request, Response } from 'express';
import { RoomService } from '../services/room.service';
import { asyncHandler } from '../utils/async-handler';
import { createRoomSchema, updateRoomSchema } from '../validations/room.validation';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/custom-error';

export class RoomController {
  /**
   * Create a new room (Protected Admin).
   */
  static create = asyncHandler(async (req: Request, res: Response) => {
    const parseResult = createRoomSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message || 'Validation failed.';
      throw new AppError(firstErrorMessage, StatusCodes.BAD_REQUEST, true);
    }

    const room = await RoomService.createRoom(parseResult.data);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Room created successfully.',
      data: room,
    });
  });

  /**
   * Update an existing room (Protected Admin).
   */
  static update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw new AppError('Room ID is required.', StatusCodes.BAD_REQUEST, true);
    }

    const parseResult = updateRoomSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message || 'Validation failed.';
      throw new AppError(firstErrorMessage, StatusCodes.BAD_REQUEST, true);
    }

    const room = await RoomService.updateRoom(id, parseResult.data);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Room updated successfully.',
      data: room,
    });
  });

  /**
   * Soft delete a room (Protected Admin).
   */
  static delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw new AppError('Room ID is required.', StatusCodes.BAD_REQUEST, true);
    }

    await RoomService.deleteRoom(id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Room deleted successfully.',
    });
  });

  /**
   * Retrieve a single room (Public).
   */
  static getSingle = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw new AppError('Room ID is required.', StatusCodes.BAD_REQUEST, true);
    }

    const room = await RoomService.getRoom(id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Room retrieved successfully.',
      data: room,
    });
  });

  /**
   * Retrieve all rooms with pagination, sorting, search, and featured filter (Public).
   */
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const featured = req.query.featured !== undefined 
      ? req.query.featured === 'true' 
      : undefined;

    const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    
    const search = req.query.search as string | undefined;
    const sortBy = req.query.sortBy as any;
    const sortOrder = req.query.sortOrder as any;

    const result = await RoomService.getRooms({
      featured,
      search,
      sortBy,
      sortOrder,
      page,
      limit,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Rooms retrieved successfully.',
      data: result.rooms,
      pagination: result.pagination,
    });
  });
}
