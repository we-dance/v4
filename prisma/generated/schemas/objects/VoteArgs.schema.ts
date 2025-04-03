import { z } from 'zod'
import { VoteSelectObjectSchema } from './VoteSelect.schema'
import { VoteIncludeObjectSchema } from './VoteInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteArgs> = z
  .object({
    select: z.lazy(() => VoteSelectObjectSchema).optional(),
    include: z.lazy(() => VoteIncludeObjectSchema).optional(),
  })
  .strict()

export const VoteArgsObjectSchema = Schema
