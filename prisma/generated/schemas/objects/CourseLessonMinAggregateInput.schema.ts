import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    name: z.literal(true).optional(),
    duration: z.literal(true).optional(),
    videoId: z.literal(true).optional(),
    locked: z.literal(true).optional(),
    moduleId: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
  })
  .strict()

export const CourseLessonMinAggregateInputObjectSchema = Schema
