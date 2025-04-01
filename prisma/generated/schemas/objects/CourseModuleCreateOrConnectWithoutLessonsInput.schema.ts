import { z } from 'zod'
import { CourseModuleWhereUniqueInputObjectSchema } from './CourseModuleWhereUniqueInput.schema'
import { CourseModuleCreateWithoutLessonsInputObjectSchema } from './CourseModuleCreateWithoutLessonsInput.schema'
import { CourseModuleUncheckedCreateWithoutLessonsInputObjectSchema } from './CourseModuleUncheckedCreateWithoutLessonsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleCreateOrConnectWithoutLessonsInput> =
  z
    .object({
      where: z.lazy(() => CourseModuleWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CourseModuleCreateWithoutLessonsInputObjectSchema),
        z.lazy(
          () => CourseModuleUncheckedCreateWithoutLessonsInputObjectSchema
        ),
      ]),
    })
    .strict()

export const CourseModuleCreateOrConnectWithoutLessonsInputObjectSchema = Schema
