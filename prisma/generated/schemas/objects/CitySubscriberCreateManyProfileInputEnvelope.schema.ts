import { z } from 'zod'
import { CitySubscriberCreateManyProfileInputObjectSchema } from './CitySubscriberCreateManyProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberCreateManyProfileInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CitySubscriberCreateManyProfileInputObjectSchema),
      z.lazy(() => CitySubscriberCreateManyProfileInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const CitySubscriberCreateManyProfileInputEnvelopeObjectSchema = Schema
