import { z } from 'zod';

export const videoUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => ['video/mp4', 'video/avi', 'video/quicktime'].includes(file.type),
      'Invalid file type. Only MP4, AVI, and MOV are allowed'
    )
    .refine(
      (file) => file.size <= 1_000_000_000,
      'File must be less than 1GB'
    ),
});

export const ALLOWED_EXTENSIONS = ['.mp4', '.avi', '.mov'];