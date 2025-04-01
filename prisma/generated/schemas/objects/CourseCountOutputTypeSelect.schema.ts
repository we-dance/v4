import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseCountOutputTypeSelect> = z
  .object({
    modules: z.boolean().optional(),
    resources: z.boolean().optional(),
    offers: z.boolean().optional(),
  })
  .strict()

export const CourseCountOutputTypeSelectObjectSchema = Schema
