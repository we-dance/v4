import { z } from 'zod'
import { CountryCountOutputTypeSelectObjectSchema } from './CountryCountOutputTypeSelect.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => CountryCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict()

export const CountryCountOutputTypeArgsObjectSchema = Schema
