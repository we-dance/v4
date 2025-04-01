import { z } from 'zod'
import { CourseLessonWhereInputObjectSchema } from './CourseLessonWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonListRelationFilter> = z
  .object({
    every: z.lazy(() => CourseLessonWhereInputObjectSchema).optional(),
    some: z.lazy(() => CourseLessonWhereInputObjectSchema).optional(),
    none: z.lazy(() => CourseLessonWhereInputObjectSchema).optional(),
  })
  .strict()

export const CourseLessonListRelationFilterObjectSchema = Schema
