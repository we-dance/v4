import { z } from 'zod'
import { VoteCreateWithoutCreatedByInputObjectSchema } from './VoteCreateWithoutCreatedByInput.schema'
import { VoteUncheckedCreateWithoutCreatedByInputObjectSchema } from './VoteUncheckedCreateWithoutCreatedByInput.schema'
import { VoteCreateOrConnectWithoutCreatedByInputObjectSchema } from './VoteCreateOrConnectWithoutCreatedByInput.schema'
import { VoteUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema } from './VoteUpsertWithWhereUniqueWithoutCreatedByInput.schema'
import { VoteCreateManyCreatedByInputEnvelopeObjectSchema } from './VoteCreateManyCreatedByInputEnvelope.schema'
import { VoteWhereUniqueInputObjectSchema } from './VoteWhereUniqueInput.schema'
import { VoteUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema } from './VoteUpdateWithWhereUniqueWithoutCreatedByInput.schema'
import { VoteUpdateManyWithWhereWithoutCreatedByInputObjectSchema } from './VoteUpdateManyWithWhereWithoutCreatedByInput.schema'
import { VoteScalarWhereInputObjectSchema } from './VoteScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteUpdateManyWithoutCreatedByNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(
          () => VoteUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema
        ),
        z
          .lazy(
            () => VoteUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VoteCreateManyCreatedByInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => VoteWhereUniqueInputObjectSchema),
        z.lazy(() => VoteWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => VoteWhereUniqueInputObjectSchema),
        z.lazy(() => VoteWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => VoteWhereUniqueInputObjectSchema),
        z.lazy(() => VoteWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => VoteWhereUniqueInputObjectSchema),
        z.lazy(() => VoteWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => VoteUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema
        ),
        z
          .lazy(
            () => VoteUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => VoteUpdateManyWithWhereWithoutCreatedByInputObjectSchema),
        z
          .lazy(() => VoteUpdateManyWithWhereWithoutCreatedByInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => VoteScalarWhereInputObjectSchema),
        z.lazy(() => VoteScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const VoteUpdateManyWithoutCreatedByNestedInputObjectSchema = Schema
