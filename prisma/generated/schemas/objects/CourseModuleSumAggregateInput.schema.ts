import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleSumAggregateInputType> = z
  .object({
    order: z.literal(true).optional(),
  })
  .strict()

export const CourseModuleSumAggregateInputObjectSchema = Schema
