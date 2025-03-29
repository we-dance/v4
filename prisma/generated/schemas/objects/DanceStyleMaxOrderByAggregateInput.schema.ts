import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    hashtag: z.lazy(() => SortOrderSchema).optional(),
    synonyms: z.lazy(() => SortOrderSchema).optional(),
    regexp: z.lazy(() => SortOrderSchema).optional(),
    popular: z.lazy(() => SortOrderSchema).optional(),
    popularity: z.lazy(() => SortOrderSchema).optional(),
    familyOnly: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    history: z.lazy(() => SortOrderSchema).optional(),
    origins: z.lazy(() => SortOrderSchema).optional(),
    adjectives: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    holding: z.lazy(() => SortOrderSchema).optional(),
    year: z.lazy(() => SortOrderSchema).optional(),
    predecessors: z.lazy(() => SortOrderSchema).optional(),
    parent: z.lazy(() => SortOrderSchema).optional(),
    influence: z.lazy(() => SortOrderSchema).optional(),
    family: z.lazy(() => SortOrderSchema).optional(),
    region: z.lazy(() => SortOrderSchema).optional(),
    country: z.lazy(() => SortOrderSchema).optional(),
    genres: z.lazy(() => SortOrderSchema).optional(),
    source: z.lazy(() => SortOrderSchema).optional(),
    root: z.lazy(() => SortOrderSchema).optional(),
    partner: z.lazy(() => SortOrderSchema).optional(),
    group: z.lazy(() => SortOrderSchema).optional(),
    related: z.lazy(() => SortOrderSchema).optional(),
    music: z.lazy(() => SortOrderSchema).optional(),
    timing: z.lazy(() => SortOrderSchema).optional(),
    active: z.lazy(() => SortOrderSchema).optional(),
    video: z.lazy(() => SortOrderSchema).optional(),
    intro: z.lazy(() => SortOrderSchema).optional(),
    membersCount: z.lazy(() => SortOrderSchema).optional(),
    eventsCount: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const DanceStyleMaxOrderByAggregateInputObjectSchema = Schema
