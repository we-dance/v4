import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerFollowerIdProfileIdCompoundUniqueInput> =
  z
    .object({
      followerId: z.string(),
      profileId: z.string(),
    })
    .strict()

export const ProfileFollowerFollowerIdProfileIdCompoundUniqueInputObjectSchema =
  Schema
