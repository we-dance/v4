import { z } from 'zod'
import { VoteWhereInputObjectSchema } from './VoteWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteListRelationFilter> = z
  .object({
    every: z.lazy(() => VoteWhereInputObjectSchema).optional(),
    some: z.lazy(() => VoteWhereInputObjectSchema).optional(),
    none: z.lazy(() => VoteWhereInputObjectSchema).optional(),
  })
  .strict()

export const VoteListRelationFilterObjectSchema = Schema
