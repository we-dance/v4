import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    url: z.literal(true).optional(),
    styleId: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    createdById: z.literal(true).optional(),
  })
  .strict()

export const VideoMaxAggregateInputObjectSchema = Schema
