import { Router } from 'express';
import { RoomController } from '../controllers/room.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/public/rooms', RoomController.getAll);
router.get('/public/rooms/:id', RoomController.getSingle);

// Protected Admin routes
router.post('/admin/rooms', protect, RoomController.create);
router.put('/admin/rooms/:id', protect, RoomController.update);
router.delete('/admin/rooms/:id', protect, RoomController.delete);

export default router;
