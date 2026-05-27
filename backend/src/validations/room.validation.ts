import { z } from 'zod';

export const createRoomSchema = z.object({
  name: z.string().min(1, { message: 'Room name is required.' }).trim(),
  price: z.union([
    z.number().positive({ message: 'Price must be a positive number.' }),
    z.string().regex(/^\d+(\.\d{1,2})?$/, { message: 'Price must be a valid positive decimal number.' })
  ]),
  currency: z.enum(['ETB', 'USD']).default('ETB'),
  image: z.string().min(1, { message: 'Room image URL is required.' }).trim(),
  description: z.string().min(1, { message: 'Room description is required.' }).trim(),
  size: z.string().optional().nullable(),
  occupancy: z.number().int().positive({ message: 'Occupancy must be a positive integer.' }),
  bed: z.string().optional().nullable(),
  features: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export const updateRoomSchema = createRoomSchema.partial();

export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
