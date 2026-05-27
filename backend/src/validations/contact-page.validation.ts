import { z } from 'zod';

export const updateContactPageSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }).trim(),
  subtitle: z.string().optional().nullable(),
  introText: z.string().optional().nullable(),
  formTitle: z.string().optional().nullable(),
  nameLabel: z.string().optional().nullable(),
  emailLabel: z.string().optional().nullable(),
  phoneLabel: z.string().optional().nullable(),
  msgLabel: z.string().optional().nullable(),
  submitBtn: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  whatsappLink: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
});

export type UpdateContactPageInput = z.infer<typeof updateContactPageSchema>;
