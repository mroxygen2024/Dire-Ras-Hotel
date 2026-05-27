import { z } from 'zod';

export const updateHeroSectionSchema = z.object({
  badgeText: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  titlePart1: z.string().min(1, { message: 'Title Part 1 is required.' }).trim(),
  titlePart2: z.string().optional().nullable(),
  tagline: z.string().optional().nullable(),
  ctaBookText: z.string().optional().nullable(),
  ctaVideoText: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  backgroundImage: z.string().min(1, { message: 'Background image is required.' }).trim(),
});

export type UpdateHeroSectionInput = z.infer<typeof updateHeroSectionSchema>;
