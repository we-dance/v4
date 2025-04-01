import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { DanceStyleCountOrderByAggregateInputObjectSchema } from './DanceStyleCountOrderByAggregateInput.schema'
import { DanceStyleAvgOrderByAggregateInputObjectSchema } from './DanceStyleAvgOrderByAggregateInput.schema'
import { DanceStyleMaxOrderByAggregateInputObjectSchema } from './DanceStyleMaxOrderByAggregateInput.schema'
import { DanceStyleMinOrderByAggregateInputObjectSchema } from './DanceStyleMinOrderByAggregateInput.schema'
import { DanceStyleSumOrderByAggregateInputObjectSchema } from './DanceStyleSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    hashtag: z.lazy(() => SortOrderSchema).optional(),
    synonyms: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    regexp: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    popular: z.lazy(() => SortOrderSchema).optional(),
    popularity: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    familyOnly: z.lazy(() => SortOrderSchema).optional(),
    description: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    history: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    origins: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    adjectives: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    type: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    holding: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    year: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    predecessors: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    parent: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    influence: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    family: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    region: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    country: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    genres: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    source: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    root: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    partner: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    group: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    related: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    music: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    timing: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    active: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    video: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    intro: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    membersCount: z.lazy(() => SortOrderSchema).optional(),
    eventsCount: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => DanceStyleCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => DanceStyleAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => DanceStyleMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => DanceStyleMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => DanceStyleSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict()

export const DanceStyleOrderByWithAggregationInputObjectSchema = Schema
