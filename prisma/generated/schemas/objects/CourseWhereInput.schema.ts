import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { ProfileRelationFilterObjectSchema } from './ProfileRelationFilter.schema'
import { ProfileWhereInputObjectSchema } from './ProfileWhereInput.schema'
import { CourseModuleListRelationFilterObjectSchema } from './CourseModuleListRelationFilter.schema'
import { CourseResourceListRelationFilterObjectSchema } from './CourseResourceListRelationFilter.schema'
import { OfferListRelationFilterObjectSchema } from './OfferListRelationFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CourseWhereInputObjectSchema),
        z.lazy(() => CourseWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CourseWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CourseWhereInputObjectSchema),
        z.lazy(() => CourseWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    slug: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    subheader: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    instructorId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    coverUrl: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    instructor: z
      .union([
        z.lazy(() => ProfileRelationFilterObjectSchema),
        z.lazy(() => ProfileWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    modules: z
      .lazy(() => CourseModuleListRelationFilterObjectSchema)
      .optional(),
    resources: z
      .lazy(() => CourseResourceListRelationFilterObjectSchema)
      .optional(),
    offers: z.lazy(() => OfferListRelationFilterObjectSchema).optional(),
  })
  .strict()

export const CourseWhereInputObjectSchema = Schema
