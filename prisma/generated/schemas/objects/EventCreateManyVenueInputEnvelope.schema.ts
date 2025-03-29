import { z } from 'zod'
import { EventCreateManyVenueInputObjectSchema } from './EventCreateManyVenueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateManyVenueInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => EventCreateManyVenueInputObjectSchema),
      z.lazy(() => EventCreateManyVenueInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const EventCreateManyVenueInputEnvelopeObjectSchema = Schema
