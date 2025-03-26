import { z } from 'zod'

export const courseVideoSchema = z.object({
  id: z.string(),
  name: z.string()
    .min(3, 'Video name must be at least 3 characters')
    .max(100, 'Video name must be less than 100 characters'),
  description: z.string()
    .max(200, 'Description must be less than 200 characters')
    .optional(),
  duration: z.number(),
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional()
})

export const courseVideoUploadSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  file: z.custom<File>((value) => {
    return value instanceof File
  }, 'Must be a valid file')
})

export type CourseVideo = z.infer<typeof courseVideoSchema>
export type CourseVideoUpload = z.infer<typeof courseVideoUploadSchema> 