import { z } from 'zod'
import { ProfileCreateManyCityInputObjectSchema } from './ProfileCreateManyCityInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateManyCityInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ProfileCreateManyCityInputObjectSchema),
      z.lazy(() => ProfileCreateManyCityInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const ProfileCreateManyCityInputEnvelopeObjectSchema = Schema
