import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/public/services', ServiceController.getAll);
router.get('/public/services/:id', ServiceController.getSingle);

// Protected Admin routes
router.post('/admin/services', protect, ServiceController.create);
router.put('/admin/services/:id', protect, ServiceController.update);
router.delete('/admin/services/:id', protect, ServiceController.delete);

export default router;
