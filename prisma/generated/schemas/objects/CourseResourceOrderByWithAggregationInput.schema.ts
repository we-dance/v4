import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { CourseResourceCountOrderByAggregateInputObjectSchema } from './CourseResourceCountOrderByAggregateInput.schema'
import { CourseResourceMaxOrderByAggregateInputObjectSchema } from './CourseResourceMaxOrderByAggregateInput.schema'
import { CourseResourceMinOrderByAggregateInputObjectSchema } from './CourseResourceMinOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
    locked: z.lazy(() => SortOrderSchema).optional(),
    courseId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => CourseResourceCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => CourseResourceMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => CourseResourceMinOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict()

export const CourseResourceOrderByWithAggregationInputObjectSchema = Schema
