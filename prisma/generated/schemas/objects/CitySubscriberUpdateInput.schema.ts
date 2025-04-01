import { z } from 'zod'
import { CityUpdateOneRequiredWithoutSubscribersNestedInputObjectSchema } from './CityUpdateOneRequiredWithoutSubscribersNestedInput.schema'
import { ProfileUpdateOneRequiredWithoutCitiesNestedInputObjectSchema } from './ProfileUpdateOneRequiredWithoutCitiesNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberUpdateInput> = z
  .object({
    city: z
      .lazy(
        () => CityUpdateOneRequiredWithoutSubscribersNestedInputObjectSchema
      )
      .optional(),
    profile: z
      .lazy(() => ProfileUpdateOneRequiredWithoutCitiesNestedInputObjectSchema)
      .optional(),
  })
  .strict()

export const CitySubscriberUpdateInputObjectSchema = Schema
