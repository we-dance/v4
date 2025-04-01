import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { CourseOrderByWithRelationInputObjectSchema } from './CourseOrderByWithRelationInput.schema'
import { CourseLessonOrderByRelationAggregateInputObjectSchema } from './CourseLessonOrderByRelationAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleOrderByWithRelationInput> = z
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
    course: z.lazy(() => CourseOrderByWithRelationInputObjectSchema).optional(),
    lessons: z
      .lazy(() => CourseLessonOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict()

export const CourseModuleOrderByWithRelationInputObjectSchema = Schema
