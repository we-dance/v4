import { z } from 'zod'
import { CourseArgsObjectSchema } from './CourseArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    price: z.boolean().optional(),
    currency: z.boolean().optional(),
    duration: z.boolean().optional(),
    validFrom: z.boolean().optional(),
    validThrough: z.boolean().optional(),
    courseId: z.boolean().optional(),
    items: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    course: z
      .union([z.boolean(), z.lazy(() => CourseArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const OfferSelectObjectSchema = Schema
