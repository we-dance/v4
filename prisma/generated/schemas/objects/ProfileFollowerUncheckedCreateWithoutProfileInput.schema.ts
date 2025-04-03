import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerUncheckedCreateWithoutProfileInput> =
  z
    .object({
      id: z.number().optional(),
      followerId: z.string(),
      createdAt: z.coerce.date().optional(),
    })
    .strict()

export const ProfileFollowerUncheckedCreateWithoutProfileInputObjectSchema =
  Schema
