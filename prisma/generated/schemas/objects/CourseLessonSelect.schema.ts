import { z } from 'zod'
import { CourseModuleArgsObjectSchema } from './CourseModuleArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    duration: z.boolean().optional(),
    videoId: z.boolean().optional(),
    locked: z.boolean().optional(),
    moduleId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    module: z
      .union([z.boolean(), z.lazy(() => CourseModuleArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const CourseLessonSelectObjectSchema = Schema
