import { z } from 'zod'
import { GuestWhereUniqueInputObjectSchema } from './GuestWhereUniqueInput.schema'
import { GuestCreateWithoutEventInputObjectSchema } from './GuestCreateWithoutEventInput.schema'
import { GuestUncheckedCreateWithoutEventInputObjectSchema } from './GuestUncheckedCreateWithoutEventInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestCreateOrConnectWithoutEventInput> = z
  .object({
    where: z.lazy(() => GuestWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => GuestCreateWithoutEventInputObjectSchema),
      z.lazy(() => GuestUncheckedCreateWithoutEventInputObjectSchema),
    ]),
  })
  .strict()

export const GuestCreateOrConnectWithoutEventInputObjectSchema = Schema
