import { z } from 'zod'
import { CourseCreateWithoutInstructorInputObjectSchema } from './CourseCreateWithoutInstructorInput.schema'
import { CourseUncheckedCreateWithoutInstructorInputObjectSchema } from './CourseUncheckedCreateWithoutInstructorInput.schema'
import { CourseCreateOrConnectWithoutInstructorInputObjectSchema } from './CourseCreateOrConnectWithoutInstructorInput.schema'
import { CourseCreateManyInstructorInputEnvelopeObjectSchema } from './CourseCreateManyInstructorInputEnvelope.schema'
import { CourseWhereUniqueInputObjectSchema } from './CourseWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseCreateNestedManyWithoutInstructorInput> = z
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
    createMany: z
      .lazy(() => CourseCreateManyInstructorInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => CourseWhereUniqueInputObjectSchema),
        z.lazy(() => CourseWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const CourseCreateNestedManyWithoutInstructorInputObjectSchema = Schema
