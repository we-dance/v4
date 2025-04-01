import { z } from 'zod'
import { ProfileUpdateOneRequiredWithoutCitiesNestedInputObjectSchema } from './ProfileUpdateOneRequiredWithoutCitiesNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberUpdateWithoutCityInput> = z
  .object({
    profile: z
      .lazy(() => ProfileUpdateOneRequiredWithoutCitiesNestedInputObjectSchema)
      .optional(),
  })
  .strict()

export const CitySubscriberUpdateWithoutCityInputObjectSchema = Schema
