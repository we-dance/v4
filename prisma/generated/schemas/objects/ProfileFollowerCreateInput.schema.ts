import { z } from 'zod'
import { ProfileCreateNestedOneWithoutFollowingInputObjectSchema } from './ProfileCreateNestedOneWithoutFollowingInput.schema'
import { ProfileCreateNestedOneWithoutFollowersInputObjectSchema } from './ProfileCreateNestedOneWithoutFollowersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerCreateInput> = z
  .object({
    createdAt: z.coerce.date().optional(),
    follower: z.lazy(
      () => ProfileCreateNestedOneWithoutFollowingInputObjectSchema
    ),
    profile: z.lazy(
      () => ProfileCreateNestedOneWithoutFollowersInputObjectSchema
    ),
  })
  .strict()

export const ProfileFollowerCreateInputObjectSchema = Schema
