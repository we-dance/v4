import { z } from 'zod'
import { CourseLessonCreateWithoutModuleInputObjectSchema } from './CourseLessonCreateWithoutModuleInput.schema'
import { CourseLessonUncheckedCreateWithoutModuleInputObjectSchema } from './CourseLessonUncheckedCreateWithoutModuleInput.schema'
import { CourseLessonCreateOrConnectWithoutModuleInputObjectSchema } from './CourseLessonCreateOrConnectWithoutModuleInput.schema'
import { CourseLessonCreateManyModuleInputEnvelopeObjectSchema } from './CourseLessonCreateManyModuleInputEnvelope.schema'
import { CourseLessonWhereUniqueInputObjectSchema } from './CourseLessonWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonUncheckedCreateNestedManyWithoutModuleInput> =
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
      createMany: z
        .lazy(() => CourseLessonCreateManyModuleInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CourseLessonWhereUniqueInputObjectSchema),
          z.lazy(() => CourseLessonWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CourseLessonUncheckedCreateNestedManyWithoutModuleInputObjectSchema =
  Schema
