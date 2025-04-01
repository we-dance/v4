import { z } from 'zod'
import { GuestCreateWithoutProfileInputObjectSchema } from './GuestCreateWithoutProfileInput.schema'
import { GuestUncheckedCreateWithoutProfileInputObjectSchema } from './GuestUncheckedCreateWithoutProfileInput.schema'
import { GuestCreateOrConnectWithoutProfileInputObjectSchema } from './GuestCreateOrConnectWithoutProfileInput.schema'
import { GuestUpsertWithWhereUniqueWithoutProfileInputObjectSchema } from './GuestUpsertWithWhereUniqueWithoutProfileInput.schema'
import { GuestCreateManyProfileInputEnvelopeObjectSchema } from './GuestCreateManyProfileInputEnvelope.schema'
import { GuestWhereUniqueInputObjectSchema } from './GuestWhereUniqueInput.schema'
import { GuestUpdateWithWhereUniqueWithoutProfileInputObjectSchema } from './GuestUpdateWithWhereUniqueWithoutProfileInput.schema'
import { GuestUpdateManyWithWhereWithoutProfileInputObjectSchema } from './GuestUpdateManyWithWhereWithoutProfileInput.schema'
import { GuestScalarWhereInputObjectSchema } from './GuestScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestUpdateManyWithoutProfileNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => GuestCreateWithoutProfileInputObjectSchema),
        z.lazy(() => GuestCreateWithoutProfileInputObjectSchema).array(),
        z.lazy(() => GuestUncheckedCreateWithoutProfileInputObjectSchema),
        z
          .lazy(() => GuestUncheckedCreateWithoutProfileInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => GuestCreateOrConnectWithoutProfileInputObjectSchema),
        z
          .lazy(() => GuestCreateOrConnectWithoutProfileInputObjectSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => GuestUpsertWithWhereUniqueWithoutProfileInputObjectSchema),
        z
          .lazy(() => GuestUpsertWithWhereUniqueWithoutProfileInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => GuestCreateManyProfileInputEnvelopeObjectSchema)
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
        z.lazy(() => GuestUpdateWithWhereUniqueWithoutProfileInputObjectSchema),
        z
          .lazy(() => GuestUpdateWithWhereUniqueWithoutProfileInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => GuestUpdateManyWithWhereWithoutProfileInputObjectSchema),
        z
          .lazy(() => GuestUpdateManyWithWhereWithoutProfileInputObjectSchema)
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

export const GuestUpdateManyWithoutProfileNestedInputObjectSchema = Schema
