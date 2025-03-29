import { z } from 'zod'
import { CitySelectObjectSchema } from './CitySelect.schema'
import { CityIncludeObjectSchema } from './CityInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityArgs> = z
  .object({
    select: z.lazy(() => CitySelectObjectSchema).optional(),
    include: z.lazy(() => CityIncludeObjectSchema).optional(),
  })
  .strict()

export const CityArgsObjectSchema = Schema
