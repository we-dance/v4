import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { ProfileOrderByWithRelationInputObjectSchema } from './ProfileOrderByWithRelationInput.schema'
import { CourseModuleOrderByRelationAggregateInputObjectSchema } from './CourseModuleOrderByRelationAggregateInput.schema'
import { CourseResourceOrderByRelationAggregateInputObjectSchema } from './CourseResourceOrderByRelationAggregateInput.schema'
import { OfferOrderByRelationAggregateInputObjectSchema } from './OfferOrderByRelationAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    subheader: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    instructorId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    coverUrl: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    instructor: z
      .lazy(() => ProfileOrderByWithRelationInputObjectSchema)
      .optional(),
    modules: z
      .lazy(() => CourseModuleOrderByRelationAggregateInputObjectSchema)
      .optional(),
    resources: z
      .lazy(() => CourseResourceOrderByRelationAggregateInputObjectSchema)
      .optional(),
    offers: z
      .lazy(() => OfferOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict()

export const CourseOrderByWithRelationInputObjectSchema = Schema
