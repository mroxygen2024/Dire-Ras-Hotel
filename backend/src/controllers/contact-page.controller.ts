import { Request, Response } from 'express';
import { ContactPageService } from '../services/contact-page.service';
import { asyncHandler } from '../utils/async-handler';
import { updateContactPageSchema } from '../validations/contact-page.validation';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/custom-error';

export class ContactPageController {
  /**
   * Retrieve current contact page details (Public).
   */
  static get = asyncHandler(async (req: Request, res: Response) => {
    const result = await ContactPageService.getContactPage();
    
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Contact page details retrieved successfully.',
      data: result,
    });
  });

  /**
   * Update contact page configuration (Protected Admin).
   */
  static update = asyncHandler(async (req: Request, res: Response) => {
    // Validate the incoming body against the Zod schema
    const parseResult = updateContactPageSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message || 'Validation failed.';
      throw new AppError(
        firstErrorMessage,
        StatusCodes.BAD_REQUEST,
        true
      );
    }

    const result = await ContactPageService.updateContactPage(parseResult.data);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Contact page configuration updated successfully.',
      data: result,
    });
  });
}
