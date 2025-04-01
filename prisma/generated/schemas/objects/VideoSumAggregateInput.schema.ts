import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoSumAggregateInputType> = z
  .object({
    styleId: z.literal(true).optional(),
  })
  .strict()

export const VideoSumAggregateInputObjectSchema = Schema
