import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityCountOutputTypeSelect> = z
  .object({
    profiles: z.boolean().optional(),
    subscribers: z.boolean().optional(),
  })
  .strict()

export const CityCountOutputTypeSelectObjectSchema = Schema
