import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerAvgAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
  })
  .strict()

export const ProfileFollowerAvgAggregateInputObjectSchema = Schema
