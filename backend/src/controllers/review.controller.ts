import { Request, Response } from 'express';
import { ReviewService } from '../services/review.service';
import { asyncHandler } from '../utils/async-handler';
import {
  createReviewSchema,
  updateReviewSchema,
  updateReviewSectionSchema,
} from '../validations/review.validation';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/custom-error';

export class ReviewController {
  /**
   * Public: Fetch review section and approved reviews.
   */
  static getPublicReviews = asyncHandler(async (req: Request, res: Response) => {
    const result = await ReviewService.getPublicReviews();

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Reviews context retrieved successfully.',
      data: result,
    });
  });

  /**
   * Admin: Get all reviews.
   */
  static adminGetReviews = asyncHandler(async (req: Request, res: Response) => {
    const result = await ReviewService.getAllReviews();

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'All reviews retrieved successfully.',
      data: result,
    });
  });

  /**
   * Admin: Get a single review.
   */
  static adminGetReview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      throw new AppError('Review ID is required and must be a string.', StatusCodes.BAD_REQUEST, true);
    }

    const result = await ReviewService.getReview(id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Review retrieved successfully.',
      data: result,
    });
  });

  /**
   * Admin: Get review section configuration.
   */
  static adminGetReviewSection = asyncHandler(async (req: Request, res: Response) => {
    const result = await ReviewService.getReviewSection();

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Review section meta retrieved successfully.',
      data: result,
    });
  });

  /**
   * Admin: Create a new review.
   */
  static adminCreateReview = asyncHandler(async (req: Request, res: Response) => {
    const parseResult = createReviewSchema.safeParse(req.body);

    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message || 'Validation failed.';
      throw new AppError(firstErrorMessage, StatusCodes.BAD_REQUEST, true);
    }

    const result = await ReviewService.createReview(parseResult.data);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Review created successfully.',
      data: result,
    });
  });

  /**
   * Admin: Update an existing review.
   */
  static adminUpdateReview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      throw new AppError('Review ID is required and must be a string.', StatusCodes.BAD_REQUEST, true);
    }

    const parseResult = updateReviewSchema.safeParse(req.body);

    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message || 'Validation failed.';
      throw new AppError(firstErrorMessage, StatusCodes.BAD_REQUEST, true);
    }

    const result = await ReviewService.updateReview(id, parseResult.data);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Review updated successfully.',
      data: result,
    });
  });

  /**
   * Admin: Delete a review.
   */
  static adminDeleteReview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      throw new AppError('Review ID is required and must be a string.', StatusCodes.BAD_REQUEST, true);
    }

    await ReviewService.deleteReview(id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Review deleted successfully.',
    });
  });

  /**
   * Admin: Update review section configuration.
   */
  static adminUpdateReviewSection = asyncHandler(async (req: Request, res: Response) => {
    const parseResult = updateReviewSectionSchema.safeParse(req.body);

    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message || 'Validation failed.';
      throw new AppError(firstErrorMessage, StatusCodes.BAD_REQUEST, true);
    }

    const result = await ReviewService.updateReviewSection(parseResult.data);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Review section updated successfully.',
      data: result,
    });
  });
}
