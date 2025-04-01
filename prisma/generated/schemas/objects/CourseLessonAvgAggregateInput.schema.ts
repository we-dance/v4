import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonAvgAggregateInputType> = z
  .object({
    duration: z.literal(true).optional(),
  })
  .strict()

export const CourseLessonAvgAggregateInputObjectSchema = Schema
