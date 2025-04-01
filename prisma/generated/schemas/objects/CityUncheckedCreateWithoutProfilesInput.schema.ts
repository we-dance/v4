import { z } from 'zod'
import { CitySubscriberUncheckedCreateNestedManyWithoutCityInputObjectSchema } from './CitySubscriberUncheckedCreateNestedManyWithoutCityInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityUncheckedCreateWithoutProfilesInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    region: z.string().optional(),
    countryCode: z.string(),
    description: z.string().optional(),
    slug: z.string(),
    lat: z.number(),
    lng: z.number(),
    membersCount: z.number().optional(),
    subscribersCount: z.number().optional(),
    viewsCount: z.number().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    subscribers: z
      .lazy(
        () =>
          CitySubscriberUncheckedCreateNestedManyWithoutCityInputObjectSchema
      )
      .optional(),
  })
  .strict()

export const CityUncheckedCreateWithoutProfilesInputObjectSchema = Schema
