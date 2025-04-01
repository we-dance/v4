import { z } from 'zod'
import { VoteCreateWithoutCreatedByInputObjectSchema } from './VoteCreateWithoutCreatedByInput.schema'
import { VoteUncheckedCreateWithoutCreatedByInputObjectSchema } from './VoteUncheckedCreateWithoutCreatedByInput.schema'
import { VoteCreateOrConnectWithoutCreatedByInputObjectSchema } from './VoteCreateOrConnectWithoutCreatedByInput.schema'
import { VoteCreateManyCreatedByInputEnvelopeObjectSchema } from './VoteCreateManyCreatedByInputEnvelope.schema'
import { VoteWhereUniqueInputObjectSchema } from './VoteWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteUncheckedCreateNestedManyWithoutCreatedByInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VoteCreateWithoutCreatedByInputObjectSchema),
          z.lazy(() => VoteCreateWithoutCreatedByInputObjectSchema).array(),
          z.lazy(() => VoteUncheckedCreateWithoutCreatedByInputObjectSchema),
          z
            .lazy(() => VoteUncheckedCreateWithoutCreatedByInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => VoteCreateOrConnectWithoutCreatedByInputObjectSchema),
          z
            .lazy(() => VoteCreateOrConnectWithoutCreatedByInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => VoteCreateManyCreatedByInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => VoteWhereUniqueInputObjectSchema),
          z.lazy(() => VoteWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const VoteUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema =
  Schema
