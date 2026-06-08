import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email({message: 'Invalid email'})
    .min(2, 'Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z
      .email('Invalid email')
      .min(2, 'Email is required'),
    username: z
      .string()
      .min(5, 'Username must be at least 5 characters')
      .max(256, 'Username max 256 characters'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;