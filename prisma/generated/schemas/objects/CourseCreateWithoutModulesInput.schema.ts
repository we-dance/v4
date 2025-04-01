import { z } from 'zod'
import { ProfileCreateNestedOneWithoutCoursesAsinstructorInputObjectSchema } from './ProfileCreateNestedOneWithoutCoursesAsinstructorInput.schema'
import { CourseResourceCreateNestedManyWithoutCourseInputObjectSchema } from './CourseResourceCreateNestedManyWithoutCourseInput.schema'
import { OfferCreateNestedManyWithoutCourseInputObjectSchema } from './OfferCreateNestedManyWithoutCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseCreateWithoutModulesInput> = z
  .object({
    id: z.string().optional(),
    slug: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
    subheader: z.string().optional().nullable(),
    coverUrl: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    instructor: z
      .lazy(
        () => ProfileCreateNestedOneWithoutCoursesAsinstructorInputObjectSchema
      )
      .optional(),
    resources: z
      .lazy(() => CourseResourceCreateNestedManyWithoutCourseInputObjectSchema)
      .optional(),
    offers: z
      .lazy(() => OfferCreateNestedManyWithoutCourseInputObjectSchema)
      .optional(),
  })
  .strict()

export const CourseCreateWithoutModulesInputObjectSchema = Schema
