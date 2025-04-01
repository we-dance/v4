import { z } from 'zod'
import { CourseLessonWhereUniqueInputObjectSchema } from './CourseLessonWhereUniqueInput.schema'
import { CourseLessonUpdateWithoutModuleInputObjectSchema } from './CourseLessonUpdateWithoutModuleInput.schema'
import { CourseLessonUncheckedUpdateWithoutModuleInputObjectSchema } from './CourseLessonUncheckedUpdateWithoutModuleInput.schema'
import { CourseLessonCreateWithoutModuleInputObjectSchema } from './CourseLessonCreateWithoutModuleInput.schema'
import { CourseLessonUncheckedCreateWithoutModuleInputObjectSchema } from './CourseLessonUncheckedCreateWithoutModuleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonUpsertWithWhereUniqueWithoutModuleInput> =
  z
    .object({
      where: z.lazy(() => CourseLessonWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CourseLessonUpdateWithoutModuleInputObjectSchema),
        z.lazy(() => CourseLessonUncheckedUpdateWithoutModuleInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CourseLessonCreateWithoutModuleInputObjectSchema),
        z.lazy(() => CourseLessonUncheckedCreateWithoutModuleInputObjectSchema),
      ]),
    })
    .strict()

export const CourseLessonUpsertWithWhereUniqueWithoutModuleInputObjectSchema =
  Schema
