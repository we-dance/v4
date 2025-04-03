import { z } from 'zod'
import { CourseResourceWhereUniqueInputObjectSchema } from './CourseResourceWhereUniqueInput.schema'
import { CourseResourceUpdateWithoutCourseInputObjectSchema } from './CourseResourceUpdateWithoutCourseInput.schema'
import { CourseResourceUncheckedUpdateWithoutCourseInputObjectSchema } from './CourseResourceUncheckedUpdateWithoutCourseInput.schema'
import { CourseResourceCreateWithoutCourseInputObjectSchema } from './CourseResourceCreateWithoutCourseInput.schema'
import { CourseResourceUncheckedCreateWithoutCourseInputObjectSchema } from './CourseResourceUncheckedCreateWithoutCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceUpsertWithWhereUniqueWithoutCourseInput> =
  z
    .object({
      where: z.lazy(() => CourseResourceWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CourseResourceUpdateWithoutCourseInputObjectSchema),
        z.lazy(
          () => CourseResourceUncheckedUpdateWithoutCourseInputObjectSchema
        ),
      ]),
      create: z.union([
        z.lazy(() => CourseResourceCreateWithoutCourseInputObjectSchema),
        z.lazy(
          () => CourseResourceUncheckedCreateWithoutCourseInputObjectSchema
        ),
      ]),
    })
    .strict()

export const CourseResourceUpsertWithWhereUniqueWithoutCourseInputObjectSchema =
  Schema
