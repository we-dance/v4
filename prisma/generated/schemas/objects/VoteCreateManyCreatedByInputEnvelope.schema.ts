import { z } from 'zod'
import { VoteCreateManyCreatedByInputObjectSchema } from './VoteCreateManyCreatedByInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteCreateManyCreatedByInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => VoteCreateManyCreatedByInputObjectSchema),
      z.lazy(() => VoteCreateManyCreatedByInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const VoteCreateManyCreatedByInputEnvelopeObjectSchema = Schema
