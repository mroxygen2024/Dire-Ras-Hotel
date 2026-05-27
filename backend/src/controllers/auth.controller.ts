import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { asyncHandler } from '../utils/async-handler';
import { StatusCodes } from 'http-status-codes';

export class AuthController {
  /**
   * Handle admin login request.
   */
  static login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const result = await AuthService.login(email, password);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Login successful.',
      data: result,
    });
  });

  /**
   * Retrieve the profile of the currently logged-in administrator.
   */
  static getProfile = asyncHandler(async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Administrator profile retrieved successfully.',
      data: {
        user: req.user,
      },
    });
  });
}
