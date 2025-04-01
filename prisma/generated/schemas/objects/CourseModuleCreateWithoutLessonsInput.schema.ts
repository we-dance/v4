import { z } from 'zod'
import { CourseCreateNestedOneWithoutModulesInputObjectSchema } from './CourseCreateNestedOneWithoutModulesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleCreateWithoutLessonsInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    order: z.number(),
    description: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    course: z.lazy(() => CourseCreateNestedOneWithoutModulesInputObjectSchema),
  })
  .strict()

export const CourseModuleCreateWithoutLessonsInputObjectSchema = Schema
