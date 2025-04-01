import { z } from 'zod'
import { CourseScalarWhereInputObjectSchema } from './CourseScalarWhereInput.schema'
import { CourseUpdateManyMutationInputObjectSchema } from './CourseUpdateManyMutationInput.schema'
import { CourseUncheckedUpdateManyWithoutCoursesAsinstructorInputObjectSchema } from './CourseUncheckedUpdateManyWithoutCoursesAsinstructorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseUpdateManyWithWhereWithoutInstructorInput> =
  z
    .object({
      where: z.lazy(() => CourseScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CourseUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            CourseUncheckedUpdateManyWithoutCoursesAsinstructorInputObjectSchema
        ),
      ]),
    })
    .strict()

export const CourseUpdateManyWithWhereWithoutInstructorInputObjectSchema =
  Schema
