import { z } from 'zod'
import { CourseLessonCreateWithoutModuleInputObjectSchema } from './CourseLessonCreateWithoutModuleInput.schema'
import { CourseLessonUncheckedCreateWithoutModuleInputObjectSchema } from './CourseLessonUncheckedCreateWithoutModuleInput.schema'
import { CourseLessonCreateOrConnectWithoutModuleInputObjectSchema } from './CourseLessonCreateOrConnectWithoutModuleInput.schema'
import { CourseLessonUpsertWithWhereUniqueWithoutModuleInputObjectSchema } from './CourseLessonUpsertWithWhereUniqueWithoutModuleInput.schema'
import { CourseLessonCreateManyModuleInputEnvelopeObjectSchema } from './CourseLessonCreateManyModuleInputEnvelope.schema'
import { CourseLessonWhereUniqueInputObjectSchema } from './CourseLessonWhereUniqueInput.schema'
import { CourseLessonUpdateWithWhereUniqueWithoutModuleInputObjectSchema } from './CourseLessonUpdateWithWhereUniqueWithoutModuleInput.schema'
import { CourseLessonUpdateManyWithWhereWithoutModuleInputObjectSchema } from './CourseLessonUpdateManyWithWhereWithoutModuleInput.schema'
import { CourseLessonScalarWhereInputObjectSchema } from './CourseLessonScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonUpdateManyWithoutModuleNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CourseLessonCreateWithoutModuleInputObjectSchema),
          z
            .lazy(() => CourseLessonCreateWithoutModuleInputObjectSchema)
            .array(),
          z.lazy(
            () => CourseLessonUncheckedCreateWithoutModuleInputObjectSchema
          ),
          z
            .lazy(
              () => CourseLessonUncheckedCreateWithoutModuleInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => CourseLessonCreateOrConnectWithoutModuleInputObjectSchema
          ),
          z
            .lazy(
              () => CourseLessonCreateOrConnectWithoutModuleInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              CourseLessonUpsertWithWhereUniqueWithoutModuleInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CourseLessonUpsertWithWhereUniqueWithoutModuleInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CourseLessonCreateManyModuleInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CourseLessonWhereUniqueInputObjectSchema),
          z.lazy(() => CourseLessonWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CourseLessonWhereUniqueInputObjectSchema),
          z.lazy(() => CourseLessonWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CourseLessonWhereUniqueInputObjectSchema),
          z.lazy(() => CourseLessonWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CourseLessonWhereUniqueInputObjectSchema),
          z.lazy(() => CourseLessonWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              CourseLessonUpdateWithWhereUniqueWithoutModuleInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CourseLessonUpdateWithWhereUniqueWithoutModuleInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => CourseLessonUpdateManyWithWhereWithoutModuleInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CourseLessonUpdateManyWithWhereWithoutModuleInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CourseLessonScalarWhereInputObjectSchema),
          z.lazy(() => CourseLessonScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CourseLessonUpdateManyWithoutModuleNestedInputObjectSchema = Schema
