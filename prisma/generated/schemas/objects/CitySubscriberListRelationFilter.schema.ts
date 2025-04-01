import { z } from 'zod'
import { CitySubscriberWhereInputObjectSchema } from './CitySubscriberWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberListRelationFilter> = z
  .object({
    every: z.lazy(() => CitySubscriberWhereInputObjectSchema).optional(),
    some: z.lazy(() => CitySubscriberWhereInputObjectSchema).optional(),
    none: z.lazy(() => CitySubscriberWhereInputObjectSchema).optional(),
  })
  .strict()

export const CitySubscriberListRelationFilterObjectSchema = Schema
