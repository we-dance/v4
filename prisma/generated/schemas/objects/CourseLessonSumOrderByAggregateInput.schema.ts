import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonSumOrderByAggregateInput> = z
  .object({
    duration: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const CourseLessonSumOrderByAggregateInputObjectSchema = Schema
