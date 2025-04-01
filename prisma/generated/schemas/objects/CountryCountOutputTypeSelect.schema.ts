import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryCountOutputTypeSelect> = z
  .object({
    cities: z.boolean().optional(),
  })
  .strict()

export const CountryCountOutputTypeSelectObjectSchema = Schema
