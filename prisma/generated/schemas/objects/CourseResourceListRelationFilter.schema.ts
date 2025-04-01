import { z } from 'zod'
import { CourseResourceWhereInputObjectSchema } from './CourseResourceWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceListRelationFilter> = z
  .object({
    every: z.lazy(() => CourseResourceWhereInputObjectSchema).optional(),
    some: z.lazy(() => CourseResourceWhereInputObjectSchema).optional(),
    none: z.lazy(() => CourseResourceWhereInputObjectSchema).optional(),
  })
  .strict()

export const CourseResourceListRelationFilterObjectSchema = Schema
