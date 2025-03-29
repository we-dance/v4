import { z } from 'zod'
import { CourseCountOutputTypeSelectObjectSchema } from './CourseCountOutputTypeSelect.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => CourseCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict()

export const CourseCountOutputTypeArgsObjectSchema = Schema
