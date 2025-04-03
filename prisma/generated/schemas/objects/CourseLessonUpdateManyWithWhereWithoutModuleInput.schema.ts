import { z } from 'zod'
import { CourseLessonScalarWhereInputObjectSchema } from './CourseLessonScalarWhereInput.schema'
import { CourseLessonUpdateManyMutationInputObjectSchema } from './CourseLessonUpdateManyMutationInput.schema'
import { CourseLessonUncheckedUpdateManyWithoutLessonsInputObjectSchema } from './CourseLessonUncheckedUpdateManyWithoutLessonsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonUpdateManyWithWhereWithoutModuleInput> =
  z
    .object({
      where: z.lazy(() => CourseLessonScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CourseLessonUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => CourseLessonUncheckedUpdateManyWithoutLessonsInputObjectSchema
        ),
      ]),
    })
    .strict()

export const CourseLessonUpdateManyWithWhereWithoutModuleInputObjectSchema =
  Schema
