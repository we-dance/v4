import { z } from 'zod'
import { CityCountOutputTypeSelectObjectSchema } from './CityCountOutputTypeSelect.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => CityCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict()

export const CityCountOutputTypeArgsObjectSchema = Schema
