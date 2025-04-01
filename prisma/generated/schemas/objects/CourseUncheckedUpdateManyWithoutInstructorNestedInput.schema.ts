import { z } from 'zod'
import { CourseCreateWithoutInstructorInputObjectSchema } from './CourseCreateWithoutInstructorInput.schema'
import { CourseUncheckedCreateWithoutInstructorInputObjectSchema } from './CourseUncheckedCreateWithoutInstructorInput.schema'
import { CourseCreateOrConnectWithoutInstructorInputObjectSchema } from './CourseCreateOrConnectWithoutInstructorInput.schema'
import { CourseUpsertWithWhereUniqueWithoutInstructorInputObjectSchema } from './CourseUpsertWithWhereUniqueWithoutInstructorInput.schema'
import { CourseCreateManyInstructorInputEnvelopeObjectSchema } from './CourseCreateManyInstructorInputEnvelope.schema'
import { CourseWhereUniqueInputObjectSchema } from './CourseWhereUniqueInput.schema'
import { CourseUpdateWithWhereUniqueWithoutInstructorInputObjectSchema } from './CourseUpdateWithWhereUniqueWithoutInstructorInput.schema'
import { CourseUpdateManyWithWhereWithoutInstructorInputObjectSchema } from './CourseUpdateManyWithWhereWithoutInstructorInput.schema'
import { CourseScalarWhereInputObjectSchema } from './CourseScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseUncheckedUpdateManyWithoutInstructorNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CourseCreateWithoutInstructorInputObjectSchema),
          z.lazy(() => CourseCreateWithoutInstructorInputObjectSchema).array(),
          z.lazy(() => CourseUncheckedCreateWithoutInstructorInputObjectSchema),
          z
            .lazy(() => CourseUncheckedCreateWithoutInstructorInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CourseCreateOrConnectWithoutInstructorInputObjectSchema),
          z
            .lazy(() => CourseCreateOrConnectWithoutInstructorInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => CourseUpsertWithWhereUniqueWithoutInstructorInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CourseUpsertWithWhereUniqueWithoutInstructorInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CourseCreateManyInstructorInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CourseWhereUniqueInputObjectSchema),
          z.lazy(() => CourseWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CourseWhereUniqueInputObjectSchema),
          z.lazy(() => CourseWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CourseWhereUniqueInputObjectSchema),
          z.lazy(() => CourseWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CourseWhereUniqueInputObjectSchema),
          z.lazy(() => CourseWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => CourseUpdateWithWhereUniqueWithoutInstructorInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CourseUpdateWithWhereUniqueWithoutInstructorInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => CourseUpdateManyWithWhereWithoutInstructorInputObjectSchema
          ),
          z
            .lazy(
              () => CourseUpdateManyWithWhereWithoutInstructorInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CourseScalarWhereInputObjectSchema),
          z.lazy(() => CourseScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CourseUncheckedUpdateManyWithoutInstructorNestedInputObjectSchema =
  Schema
