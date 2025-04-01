import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { DanceStyleOrderByRelationAggregateInputObjectSchema } from './DanceStyleOrderByRelationAggregateInput.schema'
import { ProfileOrderByWithRelationInputObjectSchema } from './ProfileOrderByWithRelationInput.schema'
import { PostOrderByRelationAggregateInputObjectSchema } from './PostOrderByRelationAggregateInput.schema'
import { GuestOrderByRelationAggregateInputObjectSchema } from './GuestOrderByRelationAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    shortId: z.lazy(() => SortOrderSchema).optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    startDate: z.lazy(() => SortOrderSchema).optional(),
    endDate: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    cover: z.lazy(() => SortOrderSchema).optional(),
    price: z.lazy(() => SortOrderSchema).optional(),
    firebaseId: z.lazy(() => SortOrderSchema).optional(),
    published: z.lazy(() => SortOrderSchema).optional(),
    creatorId: z.lazy(() => SortOrderSchema).optional(),
    organizerId: z.lazy(() => SortOrderSchema).optional(),
    venueId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    styles: z
      .lazy(() => DanceStyleOrderByRelationAggregateInputObjectSchema)
      .optional(),
    creator: z
      .lazy(() => ProfileOrderByWithRelationInputObjectSchema)
      .optional(),
    organizer: z
      .lazy(() => ProfileOrderByWithRelationInputObjectSchema)
      .optional(),
    venue: z.lazy(() => ProfileOrderByWithRelationInputObjectSchema).optional(),
    posts: z
      .lazy(() => PostOrderByRelationAggregateInputObjectSchema)
      .optional(),
    guests: z
      .lazy(() => GuestOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict()

export const EventOrderByWithRelationInputObjectSchema = Schema
