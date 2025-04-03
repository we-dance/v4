import { z } from 'zod'
import { ProfileUpdateWithoutFollowingInputObjectSchema } from './ProfileUpdateWithoutFollowingInput.schema'
import { ProfileUncheckedUpdateWithoutFollowingInputObjectSchema } from './ProfileUncheckedUpdateWithoutFollowingInput.schema'
import { ProfileCreateWithoutFollowingInputObjectSchema } from './ProfileCreateWithoutFollowingInput.schema'
import { ProfileUncheckedCreateWithoutFollowingInputObjectSchema } from './ProfileUncheckedCreateWithoutFollowingInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpsertWithoutFollowingInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutFollowingInputObjectSchema),
      z.lazy(() => ProfileUncheckedUpdateWithoutFollowingInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutFollowingInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutFollowingInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileUpsertWithoutFollowingInputObjectSchema = Schema
