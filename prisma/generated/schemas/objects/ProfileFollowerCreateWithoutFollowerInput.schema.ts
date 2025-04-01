import { z } from 'zod'
import { ProfileCreateNestedOneWithoutFollowersInputObjectSchema } from './ProfileCreateNestedOneWithoutFollowersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerCreateWithoutFollowerInput> = z
  .object({
    createdAt: z.coerce.date().optional(),
    profile: z.lazy(
      () => ProfileCreateNestedOneWithoutFollowersInputObjectSchema
    ),
  })
  .strict()

export const ProfileFollowerCreateWithoutFollowerInputObjectSchema = Schema
