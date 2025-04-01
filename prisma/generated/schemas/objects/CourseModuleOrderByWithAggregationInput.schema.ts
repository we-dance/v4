import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { CourseModuleCountOrderByAggregateInputObjectSchema } from './CourseModuleCountOrderByAggregateInput.schema'
import { CourseModuleAvgOrderByAggregateInputObjectSchema } from './CourseModuleAvgOrderByAggregateInput.schema'
import { CourseModuleMaxOrderByAggregateInputObjectSchema } from './CourseModuleMaxOrderByAggregateInput.schema'
import { CourseModuleMinOrderByAggregateInputObjectSchema } from './CourseModuleMinOrderByAggregateInput.schema'
import { CourseModuleSumOrderByAggregateInputObjectSchema } from './CourseModuleSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    order: z.lazy(() => SortOrderSchema).optional(),
    description: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    courseId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => CourseModuleCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => CourseModuleAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => CourseModuleMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => CourseModuleMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => CourseModuleSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict()

export const CourseModuleOrderByWithAggregationInputObjectSchema = Schema
