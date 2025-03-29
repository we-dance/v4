import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleAvgAggregateInputType> = z
  .object({
    order: z.literal(true).optional(),
  })
  .strict()

export const CourseModuleAvgAggregateInputObjectSchema = Schema
