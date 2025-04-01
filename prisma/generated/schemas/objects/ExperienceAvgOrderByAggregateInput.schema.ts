import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceAvgOrderByAggregateInput> = z
  .object({
    styleId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const ExperienceAvgOrderByAggregateInputObjectSchema = Schema
