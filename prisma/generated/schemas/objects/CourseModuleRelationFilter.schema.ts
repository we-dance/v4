import { z } from 'zod'
import { CourseModuleWhereInputObjectSchema } from './CourseModuleWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleRelationFilter> = z
  .object({
    is: z
      .lazy(() => CourseModuleWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => CourseModuleWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict()

export const CourseModuleRelationFilterObjectSchema = Schema
