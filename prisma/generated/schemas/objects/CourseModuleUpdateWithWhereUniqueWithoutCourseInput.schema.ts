import { z } from 'zod'
import { CourseModuleWhereUniqueInputObjectSchema } from './CourseModuleWhereUniqueInput.schema'
import { CourseModuleUpdateWithoutCourseInputObjectSchema } from './CourseModuleUpdateWithoutCourseInput.schema'
import { CourseModuleUncheckedUpdateWithoutCourseInputObjectSchema } from './CourseModuleUncheckedUpdateWithoutCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleUpdateWithWhereUniqueWithoutCourseInput> =
  z
    .object({
      where: z.lazy(() => CourseModuleWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CourseModuleUpdateWithoutCourseInputObjectSchema),
        z.lazy(() => CourseModuleUncheckedUpdateWithoutCourseInputObjectSchema),
      ]),
    })
    .strict()

export const CourseModuleUpdateWithWhereUniqueWithoutCourseInputObjectSchema =
  Schema
