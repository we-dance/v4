import { z } from 'zod'
import { EventCreateManyCreatorInputObjectSchema } from './EventCreateManyCreatorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateManyCreatorInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => EventCreateManyCreatorInputObjectSchema),
      z.lazy(() => EventCreateManyCreatorInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const EventCreateManyCreatorInputEnvelopeObjectSchema = Schema
