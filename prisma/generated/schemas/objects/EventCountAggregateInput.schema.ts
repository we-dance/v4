import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    shortId: z.literal(true).optional(),
    slug: z.literal(true).optional(),
    name: z.literal(true).optional(),
    startDate: z.literal(true).optional(),
    endDate: z.literal(true).optional(),
    type: z.literal(true).optional(),
    description: z.literal(true).optional(),
    cover: z.literal(true).optional(),
    price: z.literal(true).optional(),
    firebaseId: z.literal(true).optional(),
    published: z.literal(true).optional(),
    creatorId: z.literal(true).optional(),
    organizerId: z.literal(true).optional(),
    venueId: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict()

export const EventCountAggregateInputObjectSchema = Schema
