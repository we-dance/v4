import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberUncheckedCreateWithoutCityInput> =
  z
    .object({
      id: z.number().optional(),
      profileId: z.string(),
    })
    .strict()

export const CitySubscriberUncheckedCreateWithoutCityInputObjectSchema = Schema
