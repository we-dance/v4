import { z } from 'zod'
import { CourseResourceSelectObjectSchema } from './CourseResourceSelect.schema'
import { CourseResourceIncludeObjectSchema } from './CourseResourceInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceArgs> = z
  .object({
    select: z.lazy(() => CourseResourceSelectObjectSchema).optional(),
    include: z.lazy(() => CourseResourceIncludeObjectSchema).optional(),
  })
  .strict()

export const CourseResourceArgsObjectSchema = Schema
