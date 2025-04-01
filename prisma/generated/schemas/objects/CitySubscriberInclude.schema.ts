import { z } from 'zod'
import { CityArgsObjectSchema } from './CityArgs.schema'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberInclude> = z
  .object({
    city: z.union([z.boolean(), z.lazy(() => CityArgsObjectSchema)]).optional(),
    profile: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const CitySubscriberIncludeObjectSchema = Schema
