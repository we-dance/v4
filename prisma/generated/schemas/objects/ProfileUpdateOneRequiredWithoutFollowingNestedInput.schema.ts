import { z } from 'zod'
import { ProfileCreateWithoutFollowingInputObjectSchema } from './ProfileCreateWithoutFollowingInput.schema'
import { ProfileUncheckedCreateWithoutFollowingInputObjectSchema } from './ProfileUncheckedCreateWithoutFollowingInput.schema'
import { ProfileCreateOrConnectWithoutFollowingInputObjectSchema } from './ProfileCreateOrConnectWithoutFollowingInput.schema'
import { ProfileUpsertWithoutFollowingInputObjectSchema } from './ProfileUpsertWithoutFollowingInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutFollowingInputObjectSchema } from './ProfileUpdateWithoutFollowingInput.schema'
import { ProfileUncheckedUpdateWithoutFollowingInputObjectSchema } from './ProfileUncheckedUpdateWithoutFollowingInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutFollowingNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileCreateWithoutFollowingInputObjectSchema),
          z.lazy(() => ProfileUncheckedCreateWithoutFollowingInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProfileCreateOrConnectWithoutFollowingInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => ProfileUpsertWithoutFollowingInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProfileUpdateWithoutFollowingInputObjectSchema),
          z.lazy(() => ProfileUncheckedUpdateWithoutFollowingInputObjectSchema),
        ])
        .optional(),
    })
    .strict()

export const ProfileUpdateOneRequiredWithoutFollowingNestedInputObjectSchema =
  Schema
