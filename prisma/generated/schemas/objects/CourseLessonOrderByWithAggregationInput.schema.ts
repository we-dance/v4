import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { CourseLessonCountOrderByAggregateInputObjectSchema } from './CourseLessonCountOrderByAggregateInput.schema'
import { CourseLessonAvgOrderByAggregateInputObjectSchema } from './CourseLessonAvgOrderByAggregateInput.schema'
import { CourseLessonMaxOrderByAggregateInputObjectSchema } from './CourseLessonMaxOrderByAggregateInput.schema'
import { CourseLessonMinOrderByAggregateInputObjectSchema } from './CourseLessonMinOrderByAggregateInput.schema'
import { CourseLessonSumOrderByAggregateInputObjectSchema } from './CourseLessonSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    duration: z.lazy(() => SortOrderSchema).optional(),
    videoId: z.lazy(() => SortOrderSchema).optional(),
    locked: z.lazy(() => SortOrderSchema).optional(),
    moduleId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => CourseLessonCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => CourseLessonAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => CourseLessonMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => CourseLessonMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => CourseLessonSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict()

export const CourseLessonOrderByWithAggregationInputObjectSchema = Schema
