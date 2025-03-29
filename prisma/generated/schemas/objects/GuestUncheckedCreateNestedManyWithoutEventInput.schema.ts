import { z } from 'zod'
import { GuestCreateWithoutEventInputObjectSchema } from './GuestCreateWithoutEventInput.schema'
import { GuestUncheckedCreateWithoutEventInputObjectSchema } from './GuestUncheckedCreateWithoutEventInput.schema'
import { GuestCreateOrConnectWithoutEventInputObjectSchema } from './GuestCreateOrConnectWithoutEventInput.schema'
import { GuestCreateManyEventInputEnvelopeObjectSchema } from './GuestCreateManyEventInputEnvelope.schema'
import { GuestWhereUniqueInputObjectSchema } from './GuestWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestUncheckedCreateNestedManyWithoutEventInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GuestCreateWithoutEventInputObjectSchema),
          z.lazy(() => GuestCreateWithoutEventInputObjectSchema).array(),
          z.lazy(() => GuestUncheckedCreateWithoutEventInputObjectSchema),
          z
            .lazy(() => GuestUncheckedCreateWithoutEventInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GuestCreateOrConnectWithoutEventInputObjectSchema),
          z
            .lazy(() => GuestCreateOrConnectWithoutEventInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GuestCreateManyEventInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => GuestWhereUniqueInputObjectSchema),
          z.lazy(() => GuestWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const GuestUncheckedCreateNestedManyWithoutEventInputObjectSchema =
  Schema
