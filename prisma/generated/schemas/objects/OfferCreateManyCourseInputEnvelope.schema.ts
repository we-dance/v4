import { z } from 'zod'
import { OfferCreateManyCourseInputObjectSchema } from './OfferCreateManyCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferCreateManyCourseInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => OfferCreateManyCourseInputObjectSchema),
      z.lazy(() => OfferCreateManyCourseInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const OfferCreateManyCourseInputEnvelopeObjectSchema = Schema
