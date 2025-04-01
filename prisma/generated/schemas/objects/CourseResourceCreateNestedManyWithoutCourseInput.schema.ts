import { z } from 'zod'
import { CourseResourceCreateWithoutCourseInputObjectSchema } from './CourseResourceCreateWithoutCourseInput.schema'
import { CourseResourceUncheckedCreateWithoutCourseInputObjectSchema } from './CourseResourceUncheckedCreateWithoutCourseInput.schema'
import { CourseResourceCreateOrConnectWithoutCourseInputObjectSchema } from './CourseResourceCreateOrConnectWithoutCourseInput.schema'
import { CourseResourceCreateManyCourseInputEnvelopeObjectSchema } from './CourseResourceCreateManyCourseInputEnvelope.schema'
import { CourseResourceWhereUniqueInputObjectSchema } from './CourseResourceWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceCreateNestedManyWithoutCourseInput> =
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
      createMany: z
        .lazy(() => CourseResourceCreateManyCourseInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CourseResourceWhereUniqueInputObjectSchema),
          z.lazy(() => CourseResourceWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CourseResourceCreateNestedManyWithoutCourseInputObjectSchema =
  Schema
