import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteCreateManyInput> = z
  .object({
    id: z.string().optional(),
    winnerId: z.string(),
    loserId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    createdById: z.string(),
  })
  .strict()

export const VoteCreateManyInputObjectSchema = Schema
