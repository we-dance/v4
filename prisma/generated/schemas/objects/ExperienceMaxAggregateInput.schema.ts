import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceMaxAggregateInputType> = z
  .object({
    level: z.literal(true).optional(),
    highlighted: z.literal(true).optional(),
    profileId: z.literal(true).optional(),
    styleId: z.literal(true).optional(),
  })
  .strict()

export const ExperienceMaxAggregateInputObjectSchema = Schema
