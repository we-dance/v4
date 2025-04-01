import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerCreateManyInput> = z
  .object({
    id: z.number().optional(),
    followerId: z.string(),
    profileId: z.string(),
    createdAt: z.coerce.date().optional(),
  })
  .strict()

export const ProfileFollowerCreateManyInputObjectSchema = Schema
