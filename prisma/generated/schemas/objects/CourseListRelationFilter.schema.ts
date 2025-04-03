import { z } from 'zod'
import { CourseWhereInputObjectSchema } from './CourseWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseListRelationFilter> = z
  .object({
    every: z.lazy(() => CourseWhereInputObjectSchema).optional(),
    some: z.lazy(() => CourseWhereInputObjectSchema).optional(),
    none: z.lazy(() => CourseWhereInputObjectSchema).optional(),
  })
  .strict()

export const CourseListRelationFilterObjectSchema = Schema
