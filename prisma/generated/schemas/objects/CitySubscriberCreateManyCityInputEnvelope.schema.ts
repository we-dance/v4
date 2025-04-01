import { z } from 'zod'
import { CitySubscriberCreateManyCityInputObjectSchema } from './CitySubscriberCreateManyCityInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberCreateManyCityInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CitySubscriberCreateManyCityInputObjectSchema),
      z.lazy(() => CitySubscriberCreateManyCityInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const CitySubscriberCreateManyCityInputEnvelopeObjectSchema = Schema
