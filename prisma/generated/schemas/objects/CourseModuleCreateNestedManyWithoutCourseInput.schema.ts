import { z } from 'zod'
import { CourseModuleCreateWithoutCourseInputObjectSchema } from './CourseModuleCreateWithoutCourseInput.schema'
import { CourseModuleUncheckedCreateWithoutCourseInputObjectSchema } from './CourseModuleUncheckedCreateWithoutCourseInput.schema'
import { CourseModuleCreateOrConnectWithoutCourseInputObjectSchema } from './CourseModuleCreateOrConnectWithoutCourseInput.schema'
import { CourseModuleCreateManyCourseInputEnvelopeObjectSchema } from './CourseModuleCreateManyCourseInputEnvelope.schema'
import { CourseModuleWhereUniqueInputObjectSchema } from './CourseModuleWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleCreateNestedManyWithoutCourseInput> =
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
      createMany: z
        .lazy(() => CourseModuleCreateManyCourseInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CourseModuleWhereUniqueInputObjectSchema),
          z.lazy(() => CourseModuleWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CourseModuleCreateNestedManyWithoutCourseInputObjectSchema = Schema
