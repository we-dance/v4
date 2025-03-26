import { z } from 'zod'

export const courseMaterialSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  fileUrl: z.string().url('Must be a valid URL'),
  fileType: z.string(),
  fileSize: z.number(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type CourseMaterial = z.infer<typeof courseMaterialSchema> 