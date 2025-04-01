import { z } from 'zod'
import { GuestWhereUniqueInputObjectSchema } from './GuestWhereUniqueInput.schema'
import { GuestUpdateWithoutEventInputObjectSchema } from './GuestUpdateWithoutEventInput.schema'
import { GuestUncheckedUpdateWithoutEventInputObjectSchema } from './GuestUncheckedUpdateWithoutEventInput.schema'
import { GuestCreateWithoutEventInputObjectSchema } from './GuestCreateWithoutEventInput.schema'
import { GuestUncheckedCreateWithoutEventInputObjectSchema } from './GuestUncheckedCreateWithoutEventInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestUpsertWithWhereUniqueWithoutEventInput> = z
  .object({
    where: z.lazy(() => GuestWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => GuestUpdateWithoutEventInputObjectSchema),
      z.lazy(() => GuestUncheckedUpdateWithoutEventInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => GuestCreateWithoutEventInputObjectSchema),
      z.lazy(() => GuestUncheckedCreateWithoutEventInputObjectSchema),
    ]),
  })
  .strict()

export const GuestUpsertWithWhereUniqueWithoutEventInputObjectSchema = Schema
