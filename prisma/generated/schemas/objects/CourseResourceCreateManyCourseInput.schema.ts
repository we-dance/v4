import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceCreateManyCourseInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    url: z.string(),
    locked: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict()

export const CourseResourceCreateManyCourseInputObjectSchema = Schema
