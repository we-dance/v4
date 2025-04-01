import { z } from 'zod'
import { CitySubscriberCityIdProfileIdCompoundUniqueInputObjectSchema } from './CitySubscriberCityIdProfileIdCompoundUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberWhereUniqueInput> = z
  .object({
    id: z.number().optional(),
    cityId_profileId: z
      .lazy(() => CitySubscriberCityIdProfileIdCompoundUniqueInputObjectSchema)
      .optional(),
  })
  .strict()

export const CitySubscriberWhereUniqueInputObjectSchema = Schema
