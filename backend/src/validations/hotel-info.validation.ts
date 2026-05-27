import { z } from 'zod';

export const updateHotelInfoSchema = z.object({
  name: z.string().min(1, { message: 'Hotel name is required' }).trim(),
  tagline: z.string().optional().nullable(),
  phone: z.string().min(5, { message: 'Primary phone is required' }).trim(),
  phone2: z.string().optional().nullable(),
  email: z.string().email({ message: 'Must be a valid contact email' }).trim(),
  address: z.string().min(1, { message: 'Hotel physical address is required' }).trim(),
  heroTitle: z.string().min(1, { message: 'Hero header title is required' }).trim(),
  heroSubtitle: z.string().optional().nullable(),
  heroDescription: z.string().optional().nullable(),
  establishedText: z.string().optional().nullable(),
  logo: z.string().optional().nullable(), // Represents logoUrl in DB
});

export type UpdateHotelInfoInput = z.infer<typeof updateHotelInfoSchema>;
