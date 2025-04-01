import { z } from 'zod'
import { CountrySelectObjectSchema } from './CountrySelect.schema'
import { CountryIncludeObjectSchema } from './CountryInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryArgs> = z
  .object({
    select: z.lazy(() => CountrySelectObjectSchema).optional(),
    include: z.lazy(() => CountryIncludeObjectSchema).optional(),
  })
  .strict()

export const CountryArgsObjectSchema = Schema
