import { z } from 'zod'
import { ProfileFindManySchema } from '../findManyProfile.schema'
import { CountryArgsObjectSchema } from './CountryArgs.schema'
import { CitySubscriberFindManySchema } from '../findManyCitySubscriber.schema'
import { CityCountOutputTypeArgsObjectSchema } from './CityCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityInclude> = z
  .object({
    profiles: z
      .union([z.boolean(), z.lazy(() => ProfileFindManySchema)])
      .optional(),
    country: z
      .union([z.boolean(), z.lazy(() => CountryArgsObjectSchema)])
      .optional(),
    subscribers: z
      .union([z.boolean(), z.lazy(() => CitySubscriberFindManySchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => CityCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const CityIncludeObjectSchema = Schema
