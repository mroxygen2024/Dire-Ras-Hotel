import { Router } from 'express';
import { ContentController } from '../controllers/content.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.get('/public/heritage-section', ContentController.getHeritage);
router.put('/admin/heritage-section', protect, ContentController.updateHeritage);

router.get('/public/about-page', ContentController.getAboutPage);
router.put('/admin/about-page', protect, ContentController.updateAboutPage);

router.get('/public/why-stay-section', ContentController.getWhyStay);
router.put('/admin/why-stay-section', protect, ContentController.updateWhyStay);

export default router;