import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonCreateWithoutModuleInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    duration: z.number(),
    videoId: z.string(),
    locked: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict()

export const CourseLessonCreateWithoutModuleInputObjectSchema = Schema
