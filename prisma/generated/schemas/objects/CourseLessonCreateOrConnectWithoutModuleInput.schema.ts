import { z } from 'zod'
import { CourseLessonWhereUniqueInputObjectSchema } from './CourseLessonWhereUniqueInput.schema'
import { CourseLessonCreateWithoutModuleInputObjectSchema } from './CourseLessonCreateWithoutModuleInput.schema'
import { CourseLessonUncheckedCreateWithoutModuleInputObjectSchema } from './CourseLessonUncheckedCreateWithoutModuleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonCreateOrConnectWithoutModuleInput> =
  z
    .object({
      where: z.lazy(() => CourseLessonWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CourseLessonCreateWithoutModuleInputObjectSchema),
        z.lazy(() => CourseLessonUncheckedCreateWithoutModuleInputObjectSchema),
      ]),
    })
    .strict()

export const CourseLessonCreateOrConnectWithoutModuleInputObjectSchema = Schema
