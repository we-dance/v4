import { z } from 'zod'
import { CourseModuleCreateWithoutCourseInputObjectSchema } from './CourseModuleCreateWithoutCourseInput.schema'
import { CourseModuleUncheckedCreateWithoutCourseInputObjectSchema } from './CourseModuleUncheckedCreateWithoutCourseInput.schema'
import { CourseModuleCreateOrConnectWithoutCourseInputObjectSchema } from './CourseModuleCreateOrConnectWithoutCourseInput.schema'
import { CourseModuleUpsertWithWhereUniqueWithoutCourseInputObjectSchema } from './CourseModuleUpsertWithWhereUniqueWithoutCourseInput.schema'
import { CourseModuleCreateManyCourseInputEnvelopeObjectSchema } from './CourseModuleCreateManyCourseInputEnvelope.schema'
import { CourseModuleWhereUniqueInputObjectSchema } from './CourseModuleWhereUniqueInput.schema'
import { CourseModuleUpdateWithWhereUniqueWithoutCourseInputObjectSchema } from './CourseModuleUpdateWithWhereUniqueWithoutCourseInput.schema'
import { CourseModuleUpdateManyWithWhereWithoutCourseInputObjectSchema } from './CourseModuleUpdateManyWithWhereWithoutCourseInput.schema'
import { CourseModuleScalarWhereInputObjectSchema } from './CourseModuleScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleUncheckedUpdateManyWithoutCourseNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CourseModuleCreateWithoutCourseInputObjectSchema),
          z
            .lazy(() => CourseModuleCreateWithoutCourseInputObjectSchema)
            .array(),
          z.lazy(
            () => CourseModuleUncheckedCreateWithoutCourseInputObjectSchema
          ),
          z
            .lazy(
              () => CourseModuleUncheckedCreateWithoutCourseInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => CourseModuleCreateOrConnectWithoutCourseInputObjectSchema
          ),
          z
            .lazy(
              () => CourseModuleCreateOrConnectWithoutCourseInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              CourseModuleUpsertWithWhereUniqueWithoutCourseInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CourseModuleUpsertWithWhereUniqueWithoutCourseInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CourseModuleCreateManyCourseInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CourseModuleWhereUniqueInputObjectSchema),
          z.lazy(() => CourseModuleWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CourseModuleWhereUniqueInputObjectSchema),
          z.lazy(() => CourseModuleWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CourseModuleWhereUniqueInputObjectSchema),
          z.lazy(() => CourseModuleWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CourseModuleWhereUniqueInputObjectSchema),
          z.lazy(() => CourseModuleWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              CourseModuleUpdateWithWhereUniqueWithoutCourseInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CourseModuleUpdateWithWhereUniqueWithoutCourseInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => CourseModuleUpdateManyWithWhereWithoutCourseInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CourseModuleUpdateManyWithWhereWithoutCourseInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CourseModuleScalarWhereInputObjectSchema),
          z.lazy(() => CourseModuleScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CourseModuleUncheckedUpdateManyWithoutCourseNestedInputObjectSchema =
  Schema
