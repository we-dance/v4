import { z } from 'zod'
import { artistSchema } from './artist'

const priceSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  interval: z.enum(['month', 'year']),
  savings: z.string().optional(),
})

const planSchema = z.object({
  monthly: priceSchema,
  annual: priceSchema,
  features: z.array(z.string()),
})

const reviewSchema = z.object({
  id: z.number(),
  user: z.string(),
  rating: z.number(),
  comment: z.string(),
  date: z.string(),
})

const materialSchema = z.object({
  id: z.number(),
  title: z.string(),
  type: z.string(),
  size: z.string(),
  icon: z.string(),
})

const lessonSchema = z.object({
  id: z.number(),
  title: z.string(),
  duration: z.string(),
  videoId: z.string(),
  completed: z.boolean(),
})

const moduleSchema = z.object({
  id: z.number(),
  title: z.string(),
  lessons: z.array(lessonSchema),
})

const courseInstructorSchema = artistSchema
  .pick({
    id: true,
    name: true,
    image: true,
    level: true,
    location: true,
    languages: true,
    rating: true,
    reviewCount: true,
    socialMedia: true,
    availability: true,
    experience: true,
  })
  .extend({
    credentials: z.string(),
  })

export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  instructor: courseInstructorSchema,
  pricing: z.object({
    regular: planSchema,
    premium: planSchema,
    trial: z.object({
      duration: z.number(),
      features: z.array(z.string()),
    }),
  }),
  stats: z.object({
    enrolled: z.number(),
    completed: z.number(),
    avgRating: z.number(),
    reviewCount: z.number(),
  }),
  reviews: z.array(reviewSchema),
  preview: z.object({
    videoId: z.string(),
    duration: z.string(),
  }),
  community: z.object({
    discussions: z.number(),
    activeStudents: z.number(),
    nextLiveQ_A: z.string(),
  }),
  materials: z.array(materialSchema),
  modules: z.array(moduleSchema),
})

export type Course = z.infer<typeof courseSchema>

export const validateCourse = (data: unknown): Course => {
  return courseSchema.parse(data)
}
