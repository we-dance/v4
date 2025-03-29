import { z } from 'zod'
import { VoteWhereUniqueInputObjectSchema } from './VoteWhereUniqueInput.schema'
import { VoteUpdateWithoutCreatedByInputObjectSchema } from './VoteUpdateWithoutCreatedByInput.schema'
import { VoteUncheckedUpdateWithoutCreatedByInputObjectSchema } from './VoteUncheckedUpdateWithoutCreatedByInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteUpdateWithWhereUniqueWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => VoteWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => VoteUpdateWithoutCreatedByInputObjectSchema),
        z.lazy(() => VoteUncheckedUpdateWithoutCreatedByInputObjectSchema),
      ]),
    })
    .strict()

export const VoteUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema = Schema
