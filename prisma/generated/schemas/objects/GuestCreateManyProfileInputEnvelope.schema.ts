import { z } from 'zod'
import { GuestCreateManyProfileInputObjectSchema } from './GuestCreateManyProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestCreateManyProfileInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => GuestCreateManyProfileInputObjectSchema),
      z.lazy(() => GuestCreateManyProfileInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const GuestCreateManyProfileInputEnvelopeObjectSchema = Schema
