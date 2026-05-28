import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { asyncHandler } from '../utils/async-handler';
import { AppError } from '../utils/custom-error';
import { ContentService } from '../services/content.service';
import {
  updateAboutPageSchema,
  updateHeritageSectionSchema,
  updateWhyStaySectionSchema,
} from '../validations/content.validation';

const parseOrThrow = <T>(result: any): T => {
  if (!result.success) {
    const firstErrorMessage = result.error.issues[0]?.message || 'Validation failed.';
    throw new AppError(firstErrorMessage, StatusCodes.BAD_REQUEST, true);
  }
  return result.data as T;
};

export class ContentController {
  static getHeritage = asyncHandler(async (_req: Request, res: Response) => {
    const data = await ContentService.getHeritageSection();
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Heritage section retrieved successfully.',
      data,
    });
  });

  static updateHeritage = asyncHandler(async (req: Request, res: Response) => {
    const payload = parseOrThrow(updateHeritageSectionSchema.safeParse(req.body));
    const data = await ContentService.updateHeritageSection(payload);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Heritage section updated successfully.',
      data,
    });
  });

  static getAboutPage = asyncHandler(async (_req: Request, res: Response) => {
    const data = await ContentService.getAboutPage();
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'About page retrieved successfully.',
      data,
    });
  });

  static updateAboutPage = asyncHandler(async (req: Request, res: Response) => {
    const payload = parseOrThrow(updateAboutPageSchema.safeParse(req.body));
    const data = await ContentService.updateAboutPage(payload);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'About page updated successfully.',
      data,
    });
  });

  static getWhyStay = asyncHandler(async (_req: Request, res: Response) => {
    const data = await ContentService.getWhyStaySection();
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Why stay section retrieved successfully.',
      data,
    });
  });

  static updateWhyStay = asyncHandler(async (req: Request, res: Response) => {
    const payload = parseOrThrow(updateWhyStaySectionSchema.safeParse(req.body));
    const data = await ContentService.updateWhyStaySection(payload);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Why stay section updated successfully.',
      data,
    });
  });
}