import { z } from 'zod'
import { CourseResourceWhereUniqueInputObjectSchema } from './CourseResourceWhereUniqueInput.schema'
import { CourseResourceUpdateWithoutCourseInputObjectSchema } from './CourseResourceUpdateWithoutCourseInput.schema'
import { CourseResourceUncheckedUpdateWithoutCourseInputObjectSchema } from './CourseResourceUncheckedUpdateWithoutCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceUpdateWithWhereUniqueWithoutCourseInput> =
  z
    .object({
      where: z.lazy(() => CourseResourceWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CourseResourceUpdateWithoutCourseInputObjectSchema),
        z.lazy(
          () => CourseResourceUncheckedUpdateWithoutCourseInputObjectSchema
        ),
      ]),
    })
    .strict()

export const CourseResourceUpdateWithWhereUniqueWithoutCourseInputObjectSchema =
  Schema
