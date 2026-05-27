import { Router } from 'express';
import { HotelInfoController } from '../controllers/hotel-info.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public route to fetch brand context and contact info
router.get('/public/hotel-info', HotelInfoController.get);

// Protected route to update brand context and contact info
router.put('/admin/hotel-info', protect, HotelInfoController.update);

export default router;
