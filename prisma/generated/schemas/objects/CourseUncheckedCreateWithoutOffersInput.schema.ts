import { z } from 'zod'
import { CourseModuleUncheckedCreateNestedManyWithoutCourseInputObjectSchema } from './CourseModuleUncheckedCreateNestedManyWithoutCourseInput.schema'
import { CourseResourceUncheckedCreateNestedManyWithoutCourseInputObjectSchema } from './CourseResourceUncheckedCreateNestedManyWithoutCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseUncheckedCreateWithoutOffersInput> = z
  .object({
    id: z.string().optional(),
    slug: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
    subheader: z.string().optional().nullable(),
    instructorId: z.string().optional().nullable(),
    coverUrl: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    modules: z
      .lazy(
        () =>
          CourseModuleUncheckedCreateNestedManyWithoutCourseInputObjectSchema
      )
      .optional(),
    resources: z
      .lazy(
        () =>
          CourseResourceUncheckedCreateNestedManyWithoutCourseInputObjectSchema
      )
      .optional(),
  })
  .strict()

export const CourseUncheckedCreateWithoutOffersInputObjectSchema = Schema
