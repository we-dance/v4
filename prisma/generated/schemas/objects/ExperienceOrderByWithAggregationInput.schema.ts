import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { ExperienceCountOrderByAggregateInputObjectSchema } from './ExperienceCountOrderByAggregateInput.schema'
import { ExperienceAvgOrderByAggregateInputObjectSchema } from './ExperienceAvgOrderByAggregateInput.schema'
import { ExperienceMaxOrderByAggregateInputObjectSchema } from './ExperienceMaxOrderByAggregateInput.schema'
import { ExperienceMinOrderByAggregateInputObjectSchema } from './ExperienceMinOrderByAggregateInput.schema'
import { ExperienceSumOrderByAggregateInputObjectSchema } from './ExperienceSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceOrderByWithAggregationInput> = z
  .object({
    level: z.lazy(() => SortOrderSchema).optional(),
    highlighted: z.lazy(() => SortOrderSchema).optional(),
    profileId: z.lazy(() => SortOrderSchema).optional(),
    styleId: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => ExperienceCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => ExperienceAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => ExperienceMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => ExperienceMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => ExperienceSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict()

export const ExperienceOrderByWithAggregationInputObjectSchema = Schema
