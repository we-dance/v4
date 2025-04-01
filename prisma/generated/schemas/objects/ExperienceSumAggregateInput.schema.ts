import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceSumAggregateInputType> = z
  .object({
    styleId: z.literal(true).optional(),
  })
  .strict()

export const ExperienceSumAggregateInputObjectSchema = Schema
