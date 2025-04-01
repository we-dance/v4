import { z } from 'zod'
import { EventCreateManyOrganizerInputObjectSchema } from './EventCreateManyOrganizerInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateManyOrganizerInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => EventCreateManyOrganizerInputObjectSchema),
      z.lazy(() => EventCreateManyOrganizerInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const EventCreateManyOrganizerInputEnvelopeObjectSchema = Schema
