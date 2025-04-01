import { z } from 'zod'
import { CourseResourceCreateWithoutCourseInputObjectSchema } from './CourseResourceCreateWithoutCourseInput.schema'
import { CourseResourceUncheckedCreateWithoutCourseInputObjectSchema } from './CourseResourceUncheckedCreateWithoutCourseInput.schema'
import { CourseResourceCreateOrConnectWithoutCourseInputObjectSchema } from './CourseResourceCreateOrConnectWithoutCourseInput.schema'
import { CourseResourceUpsertWithWhereUniqueWithoutCourseInputObjectSchema } from './CourseResourceUpsertWithWhereUniqueWithoutCourseInput.schema'
import { CourseResourceCreateManyCourseInputEnvelopeObjectSchema } from './CourseResourceCreateManyCourseInputEnvelope.schema'
import { CourseResourceWhereUniqueInputObjectSchema } from './CourseResourceWhereUniqueInput.schema'
import { CourseResourceUpdateWithWhereUniqueWithoutCourseInputObjectSchema } from './CourseResourceUpdateWithWhereUniqueWithoutCourseInput.schema'
import { CourseResourceUpdateManyWithWhereWithoutCourseInputObjectSchema } from './CourseResourceUpdateManyWithWhereWithoutCourseInput.schema'
import { CourseResourceScalarWhereInputObjectSchema } from './CourseResourceScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceUpdateManyWithoutCourseNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CourseResourceCreateWithoutCourseInputObjectSchema),
          z
            .lazy(() => CourseResourceCreateWithoutCourseInputObjectSchema)
            .array(),
          z.lazy(
            () => CourseResourceUncheckedCreateWithoutCourseInputObjectSchema
          ),
          z
            .lazy(
              () => CourseResourceUncheckedCreateWithoutCourseInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => CourseResourceCreateOrConnectWithoutCourseInputObjectSchema
          ),
          z
            .lazy(
              () => CourseResourceCreateOrConnectWithoutCourseInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              CourseResourceUpsertWithWhereUniqueWithoutCourseInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CourseResourceUpsertWithWhereUniqueWithoutCourseInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CourseResourceCreateManyCourseInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CourseResourceWhereUniqueInputObjectSchema),
          z.lazy(() => CourseResourceWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CourseResourceWhereUniqueInputObjectSchema),
          z.lazy(() => CourseResourceWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CourseResourceWhereUniqueInputObjectSchema),
          z.lazy(() => CourseResourceWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CourseResourceWhereUniqueInputObjectSchema),
          z.lazy(() => CourseResourceWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              CourseResourceUpdateWithWhereUniqueWithoutCourseInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CourseResourceUpdateWithWhereUniqueWithoutCourseInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              CourseResourceUpdateManyWithWhereWithoutCourseInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CourseResourceUpdateManyWithWhereWithoutCourseInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CourseResourceScalarWhereInputObjectSchema),
          z.lazy(() => CourseResourceScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CourseResourceUpdateManyWithoutCourseNestedInputObjectSchema =
  Schema
