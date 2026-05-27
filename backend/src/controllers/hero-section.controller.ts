import { Request, Response } from 'express';
import { HeroSectionService } from '../services/hero-section.service';
import { asyncHandler } from '../utils/async-handler';
import { updateHeroSectionSchema } from '../validations/hero-section.validation';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/custom-error';

export class HeroSectionController {
  /**
   * Retrieve current Hero Section configuration (Public).
   */
  static get = asyncHandler(async (req: Request, res: Response) => {
    const result = await HeroSectionService.getHeroSection();
    
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Hero section configuration retrieved successfully.',
      data: result,
    });
  });

  /**
   * Update Hero Section configuration (Protected Admin).
   */
  static update = asyncHandler(async (req: Request, res: Response) => {
    // Validate the incoming body against the Zod schema
    const parseResult = updateHeroSectionSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message || 'Validation failed.';
      throw new AppError(
        firstErrorMessage,
        StatusCodes.BAD_REQUEST,
        true
      );
    }

    const result = await HeroSectionService.updateHeroSection(parseResult.data);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Hero section configuration updated successfully.',
      data: result,
    });
  });
}
