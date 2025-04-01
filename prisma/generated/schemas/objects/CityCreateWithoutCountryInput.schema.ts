import { z } from 'zod'
import { ProfileCreateNestedManyWithoutCityInputObjectSchema } from './ProfileCreateNestedManyWithoutCityInput.schema'
import { CitySubscriberCreateNestedManyWithoutCityInputObjectSchema } from './CitySubscriberCreateNestedManyWithoutCityInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityCreateWithoutCountryInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    region: z.string().optional(),
    description: z.string().optional(),
    slug: z.string(),
    lat: z.number(),
    lng: z.number(),
    membersCount: z.number().optional(),
    subscribersCount: z.number().optional(),
    viewsCount: z.number().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    profiles: z
      .lazy(() => ProfileCreateNestedManyWithoutCityInputObjectSchema)
      .optional(),
    subscribers: z
      .lazy(() => CitySubscriberCreateNestedManyWithoutCityInputObjectSchema)
      .optional(),
  })
  .strict()

export const CityCreateWithoutCountryInputObjectSchema = Schema
