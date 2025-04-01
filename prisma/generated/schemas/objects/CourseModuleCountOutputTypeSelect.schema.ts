import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleCountOutputTypeSelect> = z
  .object({
    lessons: z.boolean().optional(),
  })
  .strict()

export const CourseModuleCountOutputTypeSelectObjectSchema = Schema
