import { Request, Response } from 'express';
import { ServiceService } from '../services/service.service';
import { asyncHandler } from '../utils/async-handler';
import { createServiceSchema, updateServiceSchema } from '../validations/service.validation';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/custom-error';

export class ServiceController {
  /**
   * Create a new service (Protected Admin).
   */
  static create = asyncHandler(async (req: Request, res: Response) => {
    const parseResult = createServiceSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message || 'Validation failed.';
      throw new AppError(firstErrorMessage, StatusCodes.BAD_REQUEST, true);
    }

    const service = await ServiceService.createService(parseResult.data);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Service created successfully.',
      data: service,
    });
  });

  /**
   * Update an existing service (Protected Admin).
   */
  static update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id || typeof id !== 'string') {
      throw new AppError('Service ID is required and must be a string.', StatusCodes.BAD_REQUEST, true);
    }

    const parseResult = updateServiceSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message || 'Validation failed.';
      throw new AppError(firstErrorMessage, StatusCodes.BAD_REQUEST, true);
    }

    const service = await ServiceService.updateService(id, parseResult.data);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Service updated successfully.',
      data: service,
    });
  });

  /**
   * Soft delete a service (Protected Admin).
   */
  static delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id || typeof id !== 'string') {
      throw new AppError('Service ID is required and must be a string.', StatusCodes.BAD_REQUEST, true);
    }

    await ServiceService.deleteService(id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Service deleted successfully.',
    });
  });

  /**
   * Retrieve a single service by ID (Public).
   */
  static getSingle = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id || typeof id !== 'string') {
      throw new AppError('Service ID is required and must be a string.', StatusCodes.BAD_REQUEST, true);
    }

    const service = await ServiceService.getService(id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Service retrieved successfully.',
      data: service,
    });
  });

  /**
   * Retrieve all services sorted by order (Public).
   */
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const services = await ServiceService.getServices();

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Services retrieved successfully.',
      data: services,
    });
  });
}
