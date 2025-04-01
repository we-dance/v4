import { z } from 'zod'
import { ProfileCreateNestedOneWithoutCitiesInputObjectSchema } from './ProfileCreateNestedOneWithoutCitiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberCreateWithoutCityInput> = z
  .object({
    profile: z.lazy(() => ProfileCreateNestedOneWithoutCitiesInputObjectSchema),
  })
  .strict()

export const CitySubscriberCreateWithoutCityInputObjectSchema = Schema
