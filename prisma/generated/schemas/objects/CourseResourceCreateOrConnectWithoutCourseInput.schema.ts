import { z } from 'zod'
import { CourseResourceWhereUniqueInputObjectSchema } from './CourseResourceWhereUniqueInput.schema'
import { CourseResourceCreateWithoutCourseInputObjectSchema } from './CourseResourceCreateWithoutCourseInput.schema'
import { CourseResourceUncheckedCreateWithoutCourseInputObjectSchema } from './CourseResourceUncheckedCreateWithoutCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceCreateOrConnectWithoutCourseInput> =
  z
    .object({
      where: z.lazy(() => CourseResourceWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CourseResourceCreateWithoutCourseInputObjectSchema),
        z.lazy(
          () => CourseResourceUncheckedCreateWithoutCourseInputObjectSchema
        ),
      ]),
    })
    .strict()

export const CourseResourceCreateOrConnectWithoutCourseInputObjectSchema =
  Schema
