import { z } from 'zod'
import { CourseSelectObjectSchema } from './CourseSelect.schema'
import { CourseIncludeObjectSchema } from './CourseInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseArgs> = z
  .object({
    select: z.lazy(() => CourseSelectObjectSchema).optional(),
    include: z.lazy(() => CourseIncludeObjectSchema).optional(),
  })
  .strict()

export const CourseArgsObjectSchema = Schema
