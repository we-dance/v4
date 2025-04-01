import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { CourseOrderByWithRelationInputObjectSchema } from './CourseOrderByWithRelationInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
    locked: z.lazy(() => SortOrderSchema).optional(),
    courseId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    course: z.lazy(() => CourseOrderByWithRelationInputObjectSchema).optional(),
  })
  .strict()

export const CourseResourceOrderByWithRelationInputObjectSchema = Schema
