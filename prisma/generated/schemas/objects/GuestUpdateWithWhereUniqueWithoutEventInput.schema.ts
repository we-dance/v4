import { z } from 'zod'
import { GuestWhereUniqueInputObjectSchema } from './GuestWhereUniqueInput.schema'
import { GuestUpdateWithoutEventInputObjectSchema } from './GuestUpdateWithoutEventInput.schema'
import { GuestUncheckedUpdateWithoutEventInputObjectSchema } from './GuestUncheckedUpdateWithoutEventInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestUpdateWithWhereUniqueWithoutEventInput> = z
  .object({
    where: z.lazy(() => GuestWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => GuestUpdateWithoutEventInputObjectSchema),
      z.lazy(() => GuestUncheckedUpdateWithoutEventInputObjectSchema),
    ]),
  })
  .strict()

export const GuestUpdateWithWhereUniqueWithoutEventInputObjectSchema = Schema
