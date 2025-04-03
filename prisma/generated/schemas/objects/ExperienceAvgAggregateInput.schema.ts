import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceAvgAggregateInputType> = z
  .object({
    styleId: z.literal(true).optional(),
  })
  .strict()

export const ExperienceAvgAggregateInputObjectSchema = Schema
