import { z } from 'zod'
import { ProfileCreateNestedOneWithoutFollowingInputObjectSchema } from './ProfileCreateNestedOneWithoutFollowingInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerCreateWithoutProfileInput> = z
  .object({
    createdAt: z.coerce.date().optional(),
    follower: z.lazy(
      () => ProfileCreateNestedOneWithoutFollowingInputObjectSchema
    ),
  })
  .strict()

export const ProfileFollowerCreateWithoutProfileInputObjectSchema = Schema
