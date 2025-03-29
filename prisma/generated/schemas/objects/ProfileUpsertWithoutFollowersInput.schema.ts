import { z } from 'zod'
import { ProfileUpdateWithoutFollowersInputObjectSchema } from './ProfileUpdateWithoutFollowersInput.schema'
import { ProfileUncheckedUpdateWithoutFollowersInputObjectSchema } from './ProfileUncheckedUpdateWithoutFollowersInput.schema'
import { ProfileCreateWithoutFollowersInputObjectSchema } from './ProfileCreateWithoutFollowersInput.schema'
import { ProfileUncheckedCreateWithoutFollowersInputObjectSchema } from './ProfileUncheckedCreateWithoutFollowersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpsertWithoutFollowersInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutFollowersInputObjectSchema),
      z.lazy(() => ProfileUncheckedUpdateWithoutFollowersInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutFollowersInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutFollowersInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileUpsertWithoutFollowersInputObjectSchema = Schema
