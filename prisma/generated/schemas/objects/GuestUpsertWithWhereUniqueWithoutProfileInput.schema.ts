import { z } from 'zod'
import { GuestWhereUniqueInputObjectSchema } from './GuestWhereUniqueInput.schema'
import { GuestUpdateWithoutProfileInputObjectSchema } from './GuestUpdateWithoutProfileInput.schema'
import { GuestUncheckedUpdateWithoutProfileInputObjectSchema } from './GuestUncheckedUpdateWithoutProfileInput.schema'
import { GuestCreateWithoutProfileInputObjectSchema } from './GuestCreateWithoutProfileInput.schema'
import { GuestUncheckedCreateWithoutProfileInputObjectSchema } from './GuestUncheckedCreateWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestUpsertWithWhereUniqueWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => GuestWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => GuestUpdateWithoutProfileInputObjectSchema),
        z.lazy(() => GuestUncheckedUpdateWithoutProfileInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => GuestCreateWithoutProfileInputObjectSchema),
        z.lazy(() => GuestUncheckedCreateWithoutProfileInputObjectSchema),
      ]),
    })
    .strict()

export const GuestUpsertWithWhereUniqueWithoutProfileInputObjectSchema = Schema
