import { z } from 'zod'
import { ProfileFollowerCreateManyFollowerInputObjectSchema } from './ProfileFollowerCreateManyFollowerInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerCreateManyFollowerInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ProfileFollowerCreateManyFollowerInputObjectSchema),
        z
          .lazy(() => ProfileFollowerCreateManyFollowerInputObjectSchema)
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const ProfileFollowerCreateManyFollowerInputEnvelopeObjectSchema = Schema
