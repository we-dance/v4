import { z } from 'zod'
import { CityArgsObjectSchema } from './CityArgs.schema'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberSelect> = z
  .object({
    id: z.boolean().optional(),
    cityId: z.boolean().optional(),
    city: z.union([z.boolean(), z.lazy(() => CityArgsObjectSchema)]).optional(),
    profileId: z.boolean().optional(),
    profile: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const CitySubscriberSelectObjectSchema = Schema
