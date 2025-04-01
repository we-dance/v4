import { z } from 'zod'
import { CourseModuleSelectObjectSchema } from './CourseModuleSelect.schema'
import { CourseModuleIncludeObjectSchema } from './CourseModuleInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleArgs> = z
  .object({
    select: z.lazy(() => CourseModuleSelectObjectSchema).optional(),
    include: z.lazy(() => CourseModuleIncludeObjectSchema).optional(),
  })
  .strict()

export const CourseModuleArgsObjectSchema = Schema
