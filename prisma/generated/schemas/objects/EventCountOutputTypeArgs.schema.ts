import { z } from 'zod'
import { EventCountOutputTypeSelectObjectSchema } from './EventCountOutputTypeSelect.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => EventCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict()

export const EventCountOutputTypeArgsObjectSchema = Schema
