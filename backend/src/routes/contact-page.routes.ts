import { Router } from 'express';
import { ContactPageController } from '../controllers/contact-page.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public route to fetch contact page configuration context
router.get('/public/contact-page', ContactPageController.get);

// Protected route to update contact page configuration context
router.put('/admin/contact-page', protect, ContactPageController.update);

export default router;
