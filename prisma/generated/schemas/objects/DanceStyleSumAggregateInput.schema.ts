import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleSumAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    popularity: z.literal(true).optional(),
    membersCount: z.literal(true).optional(),
    eventsCount: z.literal(true).optional(),
  })
  .strict()

export const DanceStyleSumAggregateInputObjectSchema = Schema
