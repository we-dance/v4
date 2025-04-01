import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    name: z.literal(true).optional(),
    region: z.literal(true).optional(),
    countryCode: z.literal(true).optional(),
    description: z.literal(true).optional(),
    slug: z.literal(true).optional(),
    lat: z.literal(true).optional(),
    lng: z.literal(true).optional(),
    membersCount: z.literal(true).optional(),
    subscribersCount: z.literal(true).optional(),
    viewsCount: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
  })
  .strict()

export const CityMaxAggregateInputObjectSchema = Schema
