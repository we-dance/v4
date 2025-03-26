import { z } from 'zod'
import { courseVideoSchema } from './courseVideo'

export const courseModuleSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  lessons: z.array(z.object({
    id: z.string(),
    title: z.string().min(1, 'Title is required'),
    description: z.string(),
    videoUrl: z.string().url('Must be a valid URL'),
    thumbnailUrl: z.string().url('Must be a valid URL').optional()
  })),
  videos: z.array(courseVideoSchema)
})

export type CourseModule = z.infer<typeof courseModuleSchema> 