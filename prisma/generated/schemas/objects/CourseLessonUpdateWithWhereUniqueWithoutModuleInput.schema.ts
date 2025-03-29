import { z } from 'zod'
import { CourseLessonWhereUniqueInputObjectSchema } from './CourseLessonWhereUniqueInput.schema'
import { CourseLessonUpdateWithoutModuleInputObjectSchema } from './CourseLessonUpdateWithoutModuleInput.schema'
import { CourseLessonUncheckedUpdateWithoutModuleInputObjectSchema } from './CourseLessonUncheckedUpdateWithoutModuleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonUpdateWithWhereUniqueWithoutModuleInput> =
  z
    .object({
      where: z.lazy(() => CourseLessonWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CourseLessonUpdateWithoutModuleInputObjectSchema),
        z.lazy(() => CourseLessonUncheckedUpdateWithoutModuleInputObjectSchema),
      ]),
    })
    .strict()

export const CourseLessonUpdateWithWhereUniqueWithoutModuleInputObjectSchema =
  Schema
