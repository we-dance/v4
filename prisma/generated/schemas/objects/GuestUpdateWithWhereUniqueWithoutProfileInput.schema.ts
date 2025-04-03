import { z } from 'zod'
import { GuestWhereUniqueInputObjectSchema } from './GuestWhereUniqueInput.schema'
import { GuestUpdateWithoutProfileInputObjectSchema } from './GuestUpdateWithoutProfileInput.schema'
import { GuestUncheckedUpdateWithoutProfileInputObjectSchema } from './GuestUncheckedUpdateWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestUpdateWithWhereUniqueWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => GuestWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => GuestUpdateWithoutProfileInputObjectSchema),
        z.lazy(() => GuestUncheckedUpdateWithoutProfileInputObjectSchema),
      ]),
    })
    .strict()

export const GuestUpdateWithWhereUniqueWithoutProfileInputObjectSchema = Schema
