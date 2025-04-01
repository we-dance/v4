import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleCreateManyInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    order: z.number(),
    description: z.string().optional().nullable(),
    courseId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict()

export const CourseModuleCreateManyInputObjectSchema = Schema
