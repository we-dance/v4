import { z } from 'zod'
import { CourseLessonSelectObjectSchema } from './CourseLessonSelect.schema'
import { CourseLessonIncludeObjectSchema } from './CourseLessonInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonArgs> = z
  .object({
    select: z.lazy(() => CourseLessonSelectObjectSchema).optional(),
    include: z.lazy(() => CourseLessonIncludeObjectSchema).optional(),
  })
  .strict()

export const CourseLessonArgsObjectSchema = Schema
