import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/public/reviews', ReviewController.getPublicReviews);

// Protected Admin reviews routes
router.get('/admin/reviews', protect, ReviewController.adminGetReviews);
router.post('/admin/reviews', protect, ReviewController.adminCreateReview);
router.get('/admin/reviews/:id', protect, ReviewController.adminGetReview);
router.put('/admin/reviews/:id', protect, ReviewController.adminUpdateReview);
router.delete('/admin/reviews/:id', protect, ReviewController.adminDeleteReview);

// Protected Admin reviews section routes
router.get('/admin/reviews/section', protect, ReviewController.adminGetReviewSection);
router.put('/admin/reviews/section', protect, ReviewController.adminUpdateReviewSection);

export default router;
