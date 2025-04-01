import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { CourseCountOrderByAggregateInputObjectSchema } from './CourseCountOrderByAggregateInput.schema'
import { CourseMaxOrderByAggregateInputObjectSchema } from './CourseMaxOrderByAggregateInput.schema'
import { CourseMinOrderByAggregateInputObjectSchema } from './CourseMinOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    subheader: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    instructorId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    coverUrl: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => CourseCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => CourseMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => CourseMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()

export const CourseOrderByWithAggregationInputObjectSchema = Schema
