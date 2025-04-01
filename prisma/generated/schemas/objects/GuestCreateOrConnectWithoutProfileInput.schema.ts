import { z } from 'zod'
import { GuestWhereUniqueInputObjectSchema } from './GuestWhereUniqueInput.schema'
import { GuestCreateWithoutProfileInputObjectSchema } from './GuestCreateWithoutProfileInput.schema'
import { GuestUncheckedCreateWithoutProfileInputObjectSchema } from './GuestUncheckedCreateWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestCreateOrConnectWithoutProfileInput> = z
  .object({
    where: z.lazy(() => GuestWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => GuestCreateWithoutProfileInputObjectSchema),
      z.lazy(() => GuestUncheckedCreateWithoutProfileInputObjectSchema),
    ]),
  })
  .strict()

export const GuestCreateOrConnectWithoutProfileInputObjectSchema = Schema
