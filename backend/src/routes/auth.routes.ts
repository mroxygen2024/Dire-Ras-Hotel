import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';
import { authLimiter } from '../middlewares/rate-limit.middleware';

const router = Router();

// Public Authentication Endpoints (Strictly rate-limited to prevent brute-force)
router.post('/login', authLimiter, AuthController.login);

// Protected Endpoints
router.get('/profile', protect, AuthController.getProfile);

export default router;
