import { z } from 'zod'
import { SessionSelectObjectSchema } from './SessionSelect.schema'
import { SessionIncludeObjectSchema } from './SessionInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SessionArgs> = z
  .object({
    select: z.lazy(() => SessionSelectObjectSchema).optional(),
    include: z.lazy(() => SessionIncludeObjectSchema).optional(),
  })
  .strict()

export const SessionArgsObjectSchema = Schema
