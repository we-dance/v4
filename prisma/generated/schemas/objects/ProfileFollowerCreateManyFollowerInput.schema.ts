import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerCreateManyFollowerInput> = z
  .object({
    id: z.number().optional(),
    profileId: z.string(),
    createdAt: z.coerce.date().optional(),
  })
  .strict()

export const ProfileFollowerCreateManyFollowerInputObjectSchema = Schema
