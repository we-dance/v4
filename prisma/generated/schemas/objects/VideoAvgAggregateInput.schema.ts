import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoAvgAggregateInputType> = z
  .object({
    styleId: z.literal(true).optional(),
  })
  .strict()

export const VideoAvgAggregateInputObjectSchema = Schema
