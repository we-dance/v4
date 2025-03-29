import { z } from 'zod'
import { ProfileFollowerCreateManyProfileInputObjectSchema } from './ProfileFollowerCreateManyProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerCreateManyProfileInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ProfileFollowerCreateManyProfileInputObjectSchema),
        z.lazy(() => ProfileFollowerCreateManyProfileInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const ProfileFollowerCreateManyProfileInputEnvelopeObjectSchema = Schema
