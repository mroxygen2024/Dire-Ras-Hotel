import { z } from 'zod';

export const createServiceSchema = z.object({
  title: z.string().min(1, { message: 'Service title is required.' }).trim(),
  description: z.string().min(1, { message: 'Service description is required.' }).trim(),
  icon: z.string().optional().nullable(),
  order: z.number().int().default(0),
});

export const updateServiceSchema = createServiceSchema.partial();

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
