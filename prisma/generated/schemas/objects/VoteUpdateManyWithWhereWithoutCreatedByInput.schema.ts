import { z } from 'zod'
import { VoteScalarWhereInputObjectSchema } from './VoteScalarWhereInput.schema'
import { VoteUpdateManyMutationInputObjectSchema } from './VoteUpdateManyMutationInput.schema'
import { VoteUncheckedUpdateManyWithoutVotesInputObjectSchema } from './VoteUncheckedUpdateManyWithoutVotesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteUpdateManyWithWhereWithoutCreatedByInput> = z
  .object({
    where: z.lazy(() => VoteScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => VoteUpdateManyMutationInputObjectSchema),
      z.lazy(() => VoteUncheckedUpdateManyWithoutVotesInputObjectSchema),
    ]),
  })
  .strict()

export const VoteUpdateManyWithWhereWithoutCreatedByInputObjectSchema = Schema
