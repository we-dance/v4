import { z } from 'zod'
import { CityCreateNestedOneWithoutSubscribersInputObjectSchema } from './CityCreateNestedOneWithoutSubscribersInput.schema'
import { ProfileCreateNestedOneWithoutCitiesInputObjectSchema } from './ProfileCreateNestedOneWithoutCitiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberCreateInput> = z
  .object({
    city: z.lazy(() => CityCreateNestedOneWithoutSubscribersInputObjectSchema),
    profile: z.lazy(() => ProfileCreateNestedOneWithoutCitiesInputObjectSchema),
  })
  .strict()

export const CitySubscriberCreateInputObjectSchema = Schema
