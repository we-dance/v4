import { z } from 'zod'
import { CourseWhereUniqueInputObjectSchema } from './CourseWhereUniqueInput.schema'
import { CourseUpdateWithoutInstructorInputObjectSchema } from './CourseUpdateWithoutInstructorInput.schema'
import { CourseUncheckedUpdateWithoutInstructorInputObjectSchema } from './CourseUncheckedUpdateWithoutInstructorInput.schema'
import { CourseCreateWithoutInstructorInputObjectSchema } from './CourseCreateWithoutInstructorInput.schema'
import { CourseUncheckedCreateWithoutInstructorInputObjectSchema } from './CourseUncheckedCreateWithoutInstructorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseUpsertWithWhereUniqueWithoutInstructorInput> =
  z
    .object({
      where: z.lazy(() => CourseWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CourseUpdateWithoutInstructorInputObjectSchema),
        z.lazy(() => CourseUncheckedUpdateWithoutInstructorInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CourseCreateWithoutInstructorInputObjectSchema),
        z.lazy(() => CourseUncheckedCreateWithoutInstructorInputObjectSchema),
      ]),
    })
    .strict()

export const CourseUpsertWithWhereUniqueWithoutInstructorInputObjectSchema =
  Schema
