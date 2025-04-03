import { z } from 'zod'
import { ProfileCreateWithoutFollowersInputObjectSchema } from './ProfileCreateWithoutFollowersInput.schema'
import { ProfileUncheckedCreateWithoutFollowersInputObjectSchema } from './ProfileUncheckedCreateWithoutFollowersInput.schema'
import { ProfileCreateOrConnectWithoutFollowersInputObjectSchema } from './ProfileCreateOrConnectWithoutFollowersInput.schema'
import { ProfileUpsertWithoutFollowersInputObjectSchema } from './ProfileUpsertWithoutFollowersInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutFollowersInputObjectSchema } from './ProfileUpdateWithoutFollowersInput.schema'
import { ProfileUncheckedUpdateWithoutFollowersInputObjectSchema } from './ProfileUncheckedUpdateWithoutFollowersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutFollowersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileCreateWithoutFollowersInputObjectSchema),
          z.lazy(() => ProfileUncheckedCreateWithoutFollowersInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProfileCreateOrConnectWithoutFollowersInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => ProfileUpsertWithoutFollowersInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProfileUpdateWithoutFollowersInputObjectSchema),
          z.lazy(() => ProfileUncheckedUpdateWithoutFollowersInputObjectSchema),
        ])
        .optional(),
    })
    .strict()

export const ProfileUpdateOneRequiredWithoutFollowersNestedInputObjectSchema =
  Schema
