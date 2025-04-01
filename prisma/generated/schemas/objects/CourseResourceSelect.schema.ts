import { z } from 'zod'
import { CourseArgsObjectSchema } from './CourseArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    url: z.boolean().optional(),
    locked: z.boolean().optional(),
    courseId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    course: z
      .union([z.boolean(), z.lazy(() => CourseArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const CourseResourceSelectObjectSchema = Schema
