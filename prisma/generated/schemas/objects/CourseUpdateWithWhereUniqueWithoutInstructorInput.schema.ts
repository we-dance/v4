import { z } from 'zod'
import { CourseWhereUniqueInputObjectSchema } from './CourseWhereUniqueInput.schema'
import { CourseUpdateWithoutInstructorInputObjectSchema } from './CourseUpdateWithoutInstructorInput.schema'
import { CourseUncheckedUpdateWithoutInstructorInputObjectSchema } from './CourseUncheckedUpdateWithoutInstructorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseUpdateWithWhereUniqueWithoutInstructorInput> =
  z
    .object({
      where: z.lazy(() => CourseWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CourseUpdateWithoutInstructorInputObjectSchema),
        z.lazy(() => CourseUncheckedUpdateWithoutInstructorInputObjectSchema),
      ]),
    })
    .strict()

export const CourseUpdateWithWhereUniqueWithoutInstructorInputObjectSchema =
  Schema
