import { z } from 'zod'
import { CourseModuleUpdateWithoutLessonsInputObjectSchema } from './CourseModuleUpdateWithoutLessonsInput.schema'
import { CourseModuleUncheckedUpdateWithoutLessonsInputObjectSchema } from './CourseModuleUncheckedUpdateWithoutLessonsInput.schema'
import { CourseModuleCreateWithoutLessonsInputObjectSchema } from './CourseModuleCreateWithoutLessonsInput.schema'
import { CourseModuleUncheckedCreateWithoutLessonsInputObjectSchema } from './CourseModuleUncheckedCreateWithoutLessonsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleUpsertWithoutLessonsInput> = z
  .object({
    update: z.union([
      z.lazy(() => CourseModuleUpdateWithoutLessonsInputObjectSchema),
      z.lazy(() => CourseModuleUncheckedUpdateWithoutLessonsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => CourseModuleCreateWithoutLessonsInputObjectSchema),
      z.lazy(() => CourseModuleUncheckedCreateWithoutLessonsInputObjectSchema),
    ]),
  })
  .strict()

export const CourseModuleUpsertWithoutLessonsInputObjectSchema = Schema
