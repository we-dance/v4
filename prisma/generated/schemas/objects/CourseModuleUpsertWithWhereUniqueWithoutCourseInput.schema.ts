import { z } from 'zod'
import { CourseModuleWhereUniqueInputObjectSchema } from './CourseModuleWhereUniqueInput.schema'
import { CourseModuleUpdateWithoutCourseInputObjectSchema } from './CourseModuleUpdateWithoutCourseInput.schema'
import { CourseModuleUncheckedUpdateWithoutCourseInputObjectSchema } from './CourseModuleUncheckedUpdateWithoutCourseInput.schema'
import { CourseModuleCreateWithoutCourseInputObjectSchema } from './CourseModuleCreateWithoutCourseInput.schema'
import { CourseModuleUncheckedCreateWithoutCourseInputObjectSchema } from './CourseModuleUncheckedCreateWithoutCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleUpsertWithWhereUniqueWithoutCourseInput> =
  z
    .object({
      where: z.lazy(() => CourseModuleWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CourseModuleUpdateWithoutCourseInputObjectSchema),
        z.lazy(() => CourseModuleUncheckedUpdateWithoutCourseInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CourseModuleCreateWithoutCourseInputObjectSchema),
        z.lazy(() => CourseModuleUncheckedCreateWithoutCourseInputObjectSchema),
      ]),
    })
    .strict()

export const CourseModuleUpsertWithWhereUniqueWithoutCourseInputObjectSchema =
  Schema
