import { z } from 'zod';

const optionalString = z.string().optional().nullable();

export const updateHeritageSectionSchema = z.object({
  title: z.string().min(1, { message: 'Heritage title is required.' }).trim(),
  slogan: optionalString,
  description: z.string().min(1, { message: 'Heritage description is required.' }).trim(),
  badgeUrl: optionalString,
  bgImageUrl: optionalString,
  establishedYear: z.number().int().optional().nullable(),
});

export const storySectionSchema = z.object({
  id: optionalString,
  title: z.string().min(1, { message: 'Story title is required.' }).trim(),
  description: z.string().min(1, { message: 'Story description is required.' }).trim(),
  imageUrl: optionalString,
  order: z.number().int().default(0),
  alignRight: z.boolean().default(false),
});

export const timelineEventSchema = z.object({
  id: optionalString,
  year: z.string().min(1, { message: 'Timeline year is required.' }).trim(),
  title: z.string().min(1, { message: 'Timeline title is required.' }).trim(),
  description: z.string().min(1, { message: 'Timeline description is required.' }).trim(),
  order: z.number().int().default(0),
});

export const updateAboutPageSchema = z.object({
  title: z.string().min(1, { message: 'About page title is required.' }).trim(),
  subtitle: optionalString,
  mainImageUrl: optionalString,
  stories: z.array(storySectionSchema).default([]),
  events: z.array(timelineEventSchema).default([]),
});

export const whyStayFeatureSchema = z.object({
  id: optionalString,
  icon: z.string().min(1, { message: 'Feature icon is required.' }).trim(),
  title: z.string().min(1, { message: 'Feature title is required.' }).trim(),
  description: z.string().min(1, { message: 'Feature description is required.' }).trim(),
  order: z.number().int().default(0),
});

export const updateWhyStaySectionSchema = z.object({
  title: z.string().min(1, { message: 'Why stay title is required.' }).trim(),
  subtitle: optionalString,
  features: z.array(whyStayFeatureSchema).default([]),
});

export type UpdateHeritageSectionInput = z.infer<typeof updateHeritageSectionSchema>;
export type UpdateAboutPageInput = z.infer<typeof updateAboutPageSchema>;
export type UpdateWhyStaySectionInput = z.infer<typeof updateWhyStaySectionSchema>;