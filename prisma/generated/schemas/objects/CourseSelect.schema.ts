import { z } from 'zod'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'
import { CourseModuleFindManySchema } from '../findManyCourseModule.schema'
import { CourseResourceFindManySchema } from '../findManyCourseResource.schema'
import { OfferFindManySchema } from '../findManyOffer.schema'
import { CourseCountOutputTypeArgsObjectSchema } from './CourseCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseSelect> = z
  .object({
    id: z.boolean().optional(),
    slug: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    subheader: z.boolean().optional(),
    instructorId: z.boolean().optional(),
    coverUrl: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    instructor: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    modules: z
      .union([z.boolean(), z.lazy(() => CourseModuleFindManySchema)])
      .optional(),
    resources: z
      .union([z.boolean(), z.lazy(() => CourseResourceFindManySchema)])
      .optional(),
    offers: z
      .union([z.boolean(), z.lazy(() => OfferFindManySchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => CourseCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const CourseSelectObjectSchema = Schema
