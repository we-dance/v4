import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteUncheckedCreateWithoutCreatedByInput> = z
  .object({
    id: z.string().optional(),
    winnerId: z.string(),
    loserId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict()

export const VoteUncheckedCreateWithoutCreatedByInputObjectSchema = Schema
