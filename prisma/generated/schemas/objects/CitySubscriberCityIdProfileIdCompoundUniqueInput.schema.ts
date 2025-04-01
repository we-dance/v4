import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberCityIdProfileIdCompoundUniqueInput> =
  z
    .object({
      cityId: z.string(),
      profileId: z.string(),
    })
    .strict()

export const CitySubscriberCityIdProfileIdCompoundUniqueInputObjectSchema =
  Schema
