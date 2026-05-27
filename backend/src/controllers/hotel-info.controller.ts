import { Request, Response } from 'express';
import { HotelInfoService } from '../services/hotel-info.service';
import { asyncHandler } from '../utils/async-handler';
import { updateHotelInfoSchema } from '../validations/hotel-info.validation';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/custom-error';

export class HotelInfoController {
  /**
   * Retrieve current hotel information (Public).
   */
  static get = asyncHandler(async (req: Request, res: Response) => {
    const result = await HotelInfoService.getHotelInfo();
    
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Hotel configuration retrieved successfully.',
      data: result,
    });
  });

  /**
   * Update hotel configuration and hero section parameters (Protected Admin).
   */
  static update = asyncHandler(async (req: Request, res: Response) => {
    // Validate the incoming body against the Zod schema
    const parseResult = updateHotelInfoSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      // Pick the first error detail message from Zod issues
      const firstErrorMessage = parseResult.error.issues[0]?.message || 'Validation failed.';
      throw new AppError(
        firstErrorMessage,
        StatusCodes.BAD_REQUEST,
        true
      );
    }

    const result = await HotelInfoService.updateHotelInfo(parseResult.data);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Hotel configuration updated successfully.',
      data: result,
    });
  });
}
