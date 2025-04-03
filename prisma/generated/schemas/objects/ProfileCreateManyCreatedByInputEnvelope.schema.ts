import { z } from 'zod'
import { ProfileCreateManyCreatedByInputObjectSchema } from './ProfileCreateManyCreatedByInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateManyCreatedByInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ProfileCreateManyCreatedByInputObjectSchema),
      z.lazy(() => ProfileCreateManyCreatedByInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const ProfileCreateManyCreatedByInputEnvelopeObjectSchema = Schema
