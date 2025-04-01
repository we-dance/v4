import { z } from 'zod'
import { VoteWhereUniqueInputObjectSchema } from './VoteWhereUniqueInput.schema'
import { VoteCreateWithoutCreatedByInputObjectSchema } from './VoteCreateWithoutCreatedByInput.schema'
import { VoteUncheckedCreateWithoutCreatedByInputObjectSchema } from './VoteUncheckedCreateWithoutCreatedByInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteCreateOrConnectWithoutCreatedByInput> = z
  .object({
    where: z.lazy(() => VoteWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => VoteCreateWithoutCreatedByInputObjectSchema),
      z.lazy(() => VoteUncheckedCreateWithoutCreatedByInputObjectSchema),
    ]),
  })
  .strict()

export const VoteCreateOrConnectWithoutCreatedByInputObjectSchema = Schema
