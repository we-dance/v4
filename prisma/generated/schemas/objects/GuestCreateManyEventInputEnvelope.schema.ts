import { z } from 'zod'
import { GuestCreateManyEventInputObjectSchema } from './GuestCreateManyEventInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestCreateManyEventInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => GuestCreateManyEventInputObjectSchema),
      z.lazy(() => GuestCreateManyEventInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const GuestCreateManyEventInputEnvelopeObjectSchema = Schema
