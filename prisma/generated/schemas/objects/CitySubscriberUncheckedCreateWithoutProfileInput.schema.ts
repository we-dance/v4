import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberUncheckedCreateWithoutProfileInput> =
  z
    .object({
      id: z.number().optional(),
      cityId: z.string(),
    })
    .strict()

export const CitySubscriberUncheckedCreateWithoutProfileInputObjectSchema =
  Schema
