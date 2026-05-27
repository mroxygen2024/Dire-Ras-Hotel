import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public Authentication Endpoints
router.post('/login', AuthController.login);

// Protected Endpoints
router.get('/profile', protect, AuthController.getProfile);

export default router;
