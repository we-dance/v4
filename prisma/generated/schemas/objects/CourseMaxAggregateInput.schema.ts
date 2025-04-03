import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    slug: z.literal(true).optional(),
    name: z.literal(true).optional(),
    description: z.literal(true).optional(),
    subheader: z.literal(true).optional(),
    instructorId: z.literal(true).optional(),
    coverUrl: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
  })
  .strict()

export const CourseMaxAggregateInputObjectSchema = Schema
