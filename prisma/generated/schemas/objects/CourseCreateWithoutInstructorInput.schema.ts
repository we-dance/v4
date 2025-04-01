import { z } from 'zod'
import { CourseModuleCreateNestedManyWithoutCourseInputObjectSchema } from './CourseModuleCreateNestedManyWithoutCourseInput.schema'
import { CourseResourceCreateNestedManyWithoutCourseInputObjectSchema } from './CourseResourceCreateNestedManyWithoutCourseInput.schema'
import { OfferCreateNestedManyWithoutCourseInputObjectSchema } from './OfferCreateNestedManyWithoutCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseCreateWithoutInstructorInput> = z
  .object({
    id: z.string().optional(),
    slug: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
    subheader: z.string().optional().nullable(),
    coverUrl: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    modules: z
      .lazy(() => CourseModuleCreateNestedManyWithoutCourseInputObjectSchema)
      .optional(),
    resources: z
      .lazy(() => CourseResourceCreateNestedManyWithoutCourseInputObjectSchema)
      .optional(),
    offers: z
      .lazy(() => OfferCreateNestedManyWithoutCourseInputObjectSchema)
      .optional(),
  })
  .strict()

export const CourseCreateWithoutInstructorInputObjectSchema = Schema
