import { z } from 'zod'
import { EventSelectObjectSchema } from './EventSelect.schema'
import { EventIncludeObjectSchema } from './EventInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventArgs> = z
  .object({
    select: z.lazy(() => EventSelectObjectSchema).optional(),
    include: z.lazy(() => EventIncludeObjectSchema).optional(),
  })
  .strict()

export const EventArgsObjectSchema = Schema
