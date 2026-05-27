import { z } from 'zod';

export const createReviewSchema = z.object({
  name: z.string().min(1, { message: 'Reviewer name is required.' }).trim(),
  platform: z.string().optional().nullable().transform(val => val || 'Google Review'),
  text: z.string().min(1, { message: 'Review text is required.' }).trim(),
  rating: z.number().int().min(1, { message: 'Rating must be at least 1.' }).max(5, { message: 'Rating cannot exceed 5.' }),
  isApproved: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export const updateReviewSchema = createReviewSchema.partial();

export const updateReviewSectionSchema = z.object({
  badge: z.string().optional().nullable(),
  title: z.string().min(1, { message: 'Section title is required.' }).trim(),
  subtitle: z.string().optional().nullable(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
export type UpdateReviewSectionInput = z.infer<typeof updateReviewSectionSchema>;
