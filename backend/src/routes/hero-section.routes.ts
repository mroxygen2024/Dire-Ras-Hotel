import { Router } from 'express';
import { HeroSectionController } from '../controllers/hero-section.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public route to fetch hero section context
router.get('/public/hero-section', HeroSectionController.get);

// Protected route to update hero section context
router.put('/admin/hero-section', protect, HeroSectionController.update);

export default router;
