import { z } from 'zod'
import { OfferWhereInputObjectSchema } from './OfferWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferListRelationFilter> = z
  .object({
    every: z.lazy(() => OfferWhereInputObjectSchema).optional(),
    some: z.lazy(() => OfferWhereInputObjectSchema).optional(),
    none: z.lazy(() => OfferWhereInputObjectSchema).optional(),
  })
  .strict()

export const OfferListRelationFilterObjectSchema = Schema
