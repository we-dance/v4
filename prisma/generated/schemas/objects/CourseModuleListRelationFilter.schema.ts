import { z } from 'zod'
import { CourseModuleWhereInputObjectSchema } from './CourseModuleWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleListRelationFilter> = z
  .object({
    every: z.lazy(() => CourseModuleWhereInputObjectSchema).optional(),
    some: z.lazy(() => CourseModuleWhereInputObjectSchema).optional(),
    none: z.lazy(() => CourseModuleWhereInputObjectSchema).optional(),
  })
  .strict()

export const CourseModuleListRelationFilterObjectSchema = Schema
