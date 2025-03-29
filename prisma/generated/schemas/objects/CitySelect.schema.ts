import { z } from 'zod'
import { ProfileFindManySchema } from '../findManyProfile.schema'
import { CountryArgsObjectSchema } from './CountryArgs.schema'
import { CitySubscriberFindManySchema } from '../findManyCitySubscriber.schema'
import { CityCountOutputTypeArgsObjectSchema } from './CityCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    region: z.boolean().optional(),
    countryCode: z.boolean().optional(),
    description: z.boolean().optional(),
    slug: z.boolean().optional(),
    lat: z.boolean().optional(),
    lng: z.boolean().optional(),
    membersCount: z.boolean().optional(),
    subscribersCount: z.boolean().optional(),
    viewsCount: z.boolean().optional(),
    profiles: z
      .union([z.boolean(), z.lazy(() => ProfileFindManySchema)])
      .optional(),
    country: z
      .union([z.boolean(), z.lazy(() => CountryArgsObjectSchema)])
      .optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    subscribers: z
      .union([z.boolean(), z.lazy(() => CitySubscriberFindManySchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => CityCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const CitySelectObjectSchema = Schema
