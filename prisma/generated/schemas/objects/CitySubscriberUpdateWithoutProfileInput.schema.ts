import { z } from 'zod'
import { CityUpdateOneRequiredWithoutSubscribersNestedInputObjectSchema } from './CityUpdateOneRequiredWithoutSubscribersNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberUpdateWithoutProfileInput> = z
  .object({
    city: z
      .lazy(
        () => CityUpdateOneRequiredWithoutSubscribersNestedInputObjectSchema
      )
      .optional(),
  })
  .strict()

export const CitySubscriberUpdateWithoutProfileInputObjectSchema = Schema
