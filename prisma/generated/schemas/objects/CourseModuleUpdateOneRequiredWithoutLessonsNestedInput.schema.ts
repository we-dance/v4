import { z } from 'zod'
import { CourseModuleCreateWithoutLessonsInputObjectSchema } from './CourseModuleCreateWithoutLessonsInput.schema'
import { CourseModuleUncheckedCreateWithoutLessonsInputObjectSchema } from './CourseModuleUncheckedCreateWithoutLessonsInput.schema'
import { CourseModuleCreateOrConnectWithoutLessonsInputObjectSchema } from './CourseModuleCreateOrConnectWithoutLessonsInput.schema'
import { CourseModuleUpsertWithoutLessonsInputObjectSchema } from './CourseModuleUpsertWithoutLessonsInput.schema'
import { CourseModuleWhereUniqueInputObjectSchema } from './CourseModuleWhereUniqueInput.schema'
import { CourseModuleUpdateWithoutLessonsInputObjectSchema } from './CourseModuleUpdateWithoutLessonsInput.schema'
import { CourseModuleUncheckedUpdateWithoutLessonsInputObjectSchema } from './CourseModuleUncheckedUpdateWithoutLessonsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleUpdateOneRequiredWithoutLessonsNestedInput> =
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
      upsert: z
        .lazy(() => CourseModuleUpsertWithoutLessonsInputObjectSchema)
        .optional(),
      connect: z
        .lazy(() => CourseModuleWhereUniqueInputObjectSchema)
        .optional(),
      update: z
        .union([
          z.lazy(() => CourseModuleUpdateWithoutLessonsInputObjectSchema),
          z.lazy(
            () => CourseModuleUncheckedUpdateWithoutLessonsInputObjectSchema
          ),
        ])
        .optional(),
    })
    .strict()

export const CourseModuleUpdateOneRequiredWithoutLessonsNestedInputObjectSchema =
  Schema
