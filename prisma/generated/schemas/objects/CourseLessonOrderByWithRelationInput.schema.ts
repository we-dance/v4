import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { CourseModuleOrderByWithRelationInputObjectSchema } from './CourseModuleOrderByWithRelationInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    duration: z.lazy(() => SortOrderSchema).optional(),
    videoId: z.lazy(() => SortOrderSchema).optional(),
    locked: z.lazy(() => SortOrderSchema).optional(),
    moduleId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    module: z
      .lazy(() => CourseModuleOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict()

export const CourseLessonOrderByWithRelationInputObjectSchema = Schema
