import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateManyCreatorInput> = z
  .object({
    id: z.string().optional(),
    shortId: z.string().optional(),
    slug: z.string(),
    name: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    type: z.string().optional(),
    description: z.string().optional(),
    cover: z.string().optional(),
    price: z.string().optional(),
    firebaseId: z.string().optional(),
    published: z.boolean().optional(),
    organizerId: z.string(),
    venueId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict()

export const EventCreateManyCreatorInputObjectSchema = Schema
