import { z } from 'zod'
import { CountryCreateNestedOneWithoutCitiesInputObjectSchema } from './CountryCreateNestedOneWithoutCitiesInput.schema'
import { CitySubscriberCreateNestedManyWithoutCityInputObjectSchema } from './CitySubscriberCreateNestedManyWithoutCityInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityCreateWithoutProfilesInput> = z
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
    country: z.lazy(() => CountryCreateNestedOneWithoutCitiesInputObjectSchema),
    subscribers: z
      .lazy(() => CitySubscriberCreateNestedManyWithoutCityInputObjectSchema)
      .optional(),
  })
  .strict()

export const CityCreateWithoutProfilesInputObjectSchema = Schema
