import { z } from 'zod'
import { ProfileCreateNestedOneWithoutCoursesAsinstructorInputObjectSchema } from './ProfileCreateNestedOneWithoutCoursesAsinstructorInput.schema'
import { CourseModuleCreateNestedManyWithoutCourseInputObjectSchema } from './CourseModuleCreateNestedManyWithoutCourseInput.schema'
import { OfferCreateNestedManyWithoutCourseInputObjectSchema } from './OfferCreateNestedManyWithoutCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseCreateWithoutResourcesInput> = z
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
    modules: z
      .lazy(() => CourseModuleCreateNestedManyWithoutCourseInputObjectSchema)
      .optional(),
    offers: z
      .lazy(() => OfferCreateNestedManyWithoutCourseInputObjectSchema)
      .optional(),
  })
  .strict()

export const CourseCreateWithoutResourcesInputObjectSchema = Schema
