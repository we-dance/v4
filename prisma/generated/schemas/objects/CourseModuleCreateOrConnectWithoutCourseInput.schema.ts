import { z } from 'zod'
import { CourseModuleWhereUniqueInputObjectSchema } from './CourseModuleWhereUniqueInput.schema'
import { CourseModuleCreateWithoutCourseInputObjectSchema } from './CourseModuleCreateWithoutCourseInput.schema'
import { CourseModuleUncheckedCreateWithoutCourseInputObjectSchema } from './CourseModuleUncheckedCreateWithoutCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleCreateOrConnectWithoutCourseInput> =
  z
    .object({
      where: z.lazy(() => CourseModuleWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CourseModuleCreateWithoutCourseInputObjectSchema),
        z.lazy(() => CourseModuleUncheckedCreateWithoutCourseInputObjectSchema),
      ]),
    })
    .strict()

export const CourseModuleCreateOrConnectWithoutCourseInputObjectSchema = Schema
