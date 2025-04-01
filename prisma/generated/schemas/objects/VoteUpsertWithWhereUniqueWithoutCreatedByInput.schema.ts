import { z } from 'zod'
import { VoteWhereUniqueInputObjectSchema } from './VoteWhereUniqueInput.schema'
import { VoteUpdateWithoutCreatedByInputObjectSchema } from './VoteUpdateWithoutCreatedByInput.schema'
import { VoteUncheckedUpdateWithoutCreatedByInputObjectSchema } from './VoteUncheckedUpdateWithoutCreatedByInput.schema'
import { VoteCreateWithoutCreatedByInputObjectSchema } from './VoteCreateWithoutCreatedByInput.schema'
import { VoteUncheckedCreateWithoutCreatedByInputObjectSchema } from './VoteUncheckedCreateWithoutCreatedByInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteUpsertWithWhereUniqueWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => VoteWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => VoteUpdateWithoutCreatedByInputObjectSchema),
        z.lazy(() => VoteUncheckedUpdateWithoutCreatedByInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => VoteCreateWithoutCreatedByInputObjectSchema),
        z.lazy(() => VoteUncheckedCreateWithoutCreatedByInputObjectSchema),
      ]),
    })
    .strict()

export const VoteUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema = Schema
