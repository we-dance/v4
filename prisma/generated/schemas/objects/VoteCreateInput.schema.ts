import { z } from 'zod'
import { ProfileCreateNestedOneWithoutVotesInputObjectSchema } from './ProfileCreateNestedOneWithoutVotesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteCreateInput> = z
  .object({
    id: z.string().optional(),
    winnerId: z.string(),
    loserId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    createdBy: z.lazy(
      () => ProfileCreateNestedOneWithoutVotesInputObjectSchema
    ),
  })
  .strict()

export const VoteCreateInputObjectSchema = Schema
