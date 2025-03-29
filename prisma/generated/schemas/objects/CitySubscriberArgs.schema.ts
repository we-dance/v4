import { z } from 'zod'
import { CitySubscriberSelectObjectSchema } from './CitySubscriberSelect.schema'
import { CitySubscriberIncludeObjectSchema } from './CitySubscriberInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberArgs> = z
  .object({
    select: z.lazy(() => CitySubscriberSelectObjectSchema).optional(),
    include: z.lazy(() => CitySubscriberIncludeObjectSchema).optional(),
  })
  .strict()

export const CitySubscriberArgsObjectSchema = Schema
