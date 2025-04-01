import { z } from 'zod'
import { GuestCreateWithoutProfileInputObjectSchema } from './GuestCreateWithoutProfileInput.schema'
import { GuestUncheckedCreateWithoutProfileInputObjectSchema } from './GuestUncheckedCreateWithoutProfileInput.schema'
import { GuestCreateOrConnectWithoutProfileInputObjectSchema } from './GuestCreateOrConnectWithoutProfileInput.schema'
import { GuestCreateManyProfileInputEnvelopeObjectSchema } from './GuestCreateManyProfileInputEnvelope.schema'
import { GuestWhereUniqueInputObjectSchema } from './GuestWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestCreateNestedManyWithoutProfileInput> = z
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
    createMany: z
      .lazy(() => GuestCreateManyProfileInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => GuestWhereUniqueInputObjectSchema),
        z.lazy(() => GuestWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const GuestCreateNestedManyWithoutProfileInputObjectSchema = Schema
