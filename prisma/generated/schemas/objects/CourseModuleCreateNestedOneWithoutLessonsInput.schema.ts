import { z } from 'zod'
import { CourseModuleCreateWithoutLessonsInputObjectSchema } from './CourseModuleCreateWithoutLessonsInput.schema'
import { CourseModuleUncheckedCreateWithoutLessonsInputObjectSchema } from './CourseModuleUncheckedCreateWithoutLessonsInput.schema'
import { CourseModuleCreateOrConnectWithoutLessonsInputObjectSchema } from './CourseModuleCreateOrConnectWithoutLessonsInput.schema'
import { CourseModuleWhereUniqueInputObjectSchema } from './CourseModuleWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleCreateNestedOneWithoutLessonsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CourseModuleCreateWithoutLessonsInputObjectSchema),
          z.lazy(
            () => CourseModuleUncheckedCreateWithoutLessonsInputObjectSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CourseModuleCreateOrConnectWithoutLessonsInputObjectSchema)
        .optional(),
      connect: z
        .lazy(() => CourseModuleWhereUniqueInputObjectSchema)
        .optional(),
    })
    .strict()

export const CourseModuleCreateNestedOneWithoutLessonsInputObjectSchema = Schema
