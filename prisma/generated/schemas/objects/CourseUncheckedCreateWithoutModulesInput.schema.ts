import { z } from 'zod'
import { CourseResourceUncheckedCreateNestedManyWithoutCourseInputObjectSchema } from './CourseResourceUncheckedCreateNestedManyWithoutCourseInput.schema'
import { OfferUncheckedCreateNestedManyWithoutCourseInputObjectSchema } from './OfferUncheckedCreateNestedManyWithoutCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseUncheckedCreateWithoutModulesInput> = z
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
    resources: z
      .lazy(
        () =>
          CourseResourceUncheckedCreateNestedManyWithoutCourseInputObjectSchema
      )
      .optional(),
    offers: z
      .lazy(() => OfferUncheckedCreateNestedManyWithoutCourseInputObjectSchema)
      .optional(),
  })
  .strict()

export const CourseUncheckedCreateWithoutModulesInputObjectSchema = Schema
