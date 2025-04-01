import { z } from 'zod'
import { GuestCreateWithoutEventInputObjectSchema } from './GuestCreateWithoutEventInput.schema'
import { GuestUncheckedCreateWithoutEventInputObjectSchema } from './GuestUncheckedCreateWithoutEventInput.schema'
import { GuestCreateOrConnectWithoutEventInputObjectSchema } from './GuestCreateOrConnectWithoutEventInput.schema'
import { GuestUpsertWithWhereUniqueWithoutEventInputObjectSchema } from './GuestUpsertWithWhereUniqueWithoutEventInput.schema'
import { GuestCreateManyEventInputEnvelopeObjectSchema } from './GuestCreateManyEventInputEnvelope.schema'
import { GuestWhereUniqueInputObjectSchema } from './GuestWhereUniqueInput.schema'
import { GuestUpdateWithWhereUniqueWithoutEventInputObjectSchema } from './GuestUpdateWithWhereUniqueWithoutEventInput.schema'
import { GuestUpdateManyWithWhereWithoutEventInputObjectSchema } from './GuestUpdateManyWithWhereWithoutEventInput.schema'
import { GuestScalarWhereInputObjectSchema } from './GuestScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestUpdateManyWithoutEventNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => GuestCreateWithoutEventInputObjectSchema),
        z.lazy(() => GuestCreateWithoutEventInputObjectSchema).array(),
        z.lazy(() => GuestUncheckedCreateWithoutEventInputObjectSchema),
        z.lazy(() => GuestUncheckedCreateWithoutEventInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => GuestCreateOrConnectWithoutEventInputObjectSchema),
        z.lazy(() => GuestCreateOrConnectWithoutEventInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => GuestUpsertWithWhereUniqueWithoutEventInputObjectSchema),
        z
          .lazy(() => GuestUpsertWithWhereUniqueWithoutEventInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => GuestCreateManyEventInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => GuestWhereUniqueInputObjectSchema),
        z.lazy(() => GuestWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => GuestWhereUniqueInputObjectSchema),
        z.lazy(() => GuestWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => GuestWhereUniqueInputObjectSchema),
        z.lazy(() => GuestWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => GuestWhereUniqueInputObjectSchema),
        z.lazy(() => GuestWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => GuestUpdateWithWhereUniqueWithoutEventInputObjectSchema),
        z
          .lazy(() => GuestUpdateWithWhereUniqueWithoutEventInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => GuestUpdateManyWithWhereWithoutEventInputObjectSchema),
        z
          .lazy(() => GuestUpdateManyWithWhereWithoutEventInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => GuestScalarWhereInputObjectSchema),
        z.lazy(() => GuestScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const GuestUpdateManyWithoutEventNestedInputObjectSchema = Schema
