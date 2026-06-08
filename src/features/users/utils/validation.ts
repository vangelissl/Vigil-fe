import { z } from 'zod';

export const profileSchema = z.object({
	email: z
		.email('Invalid email'),
  username: z
    .string()
    .min(5, 'Username must be at least 3 characters')
    .max(256, 'Username max 20 characters'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password required'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type PasswordFormData = z.infer<typeof passwordSchema>;