import { z } from 'zod'
import { CourseModuleCountOutputTypeSelectObjectSchema } from './CourseModuleCountOutputTypeSelect.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleCountOutputTypeArgs> = z
  .object({
    select: z
      .lazy(() => CourseModuleCountOutputTypeSelectObjectSchema)
      .optional(),
  })
  .strict()

export const CourseModuleCountOutputTypeArgsObjectSchema = Schema
