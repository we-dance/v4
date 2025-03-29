import { z } from 'zod'
import { ProfileCreateWithoutPostsInputObjectSchema } from './ProfileCreateWithoutPostsInput.schema'
import { ProfileUncheckedCreateWithoutPostsInputObjectSchema } from './ProfileUncheckedCreateWithoutPostsInput.schema'
import { ProfileCreateOrConnectWithoutPostsInputObjectSchema } from './ProfileCreateOrConnectWithoutPostsInput.schema'
import { ProfileUpsertWithoutPostsInputObjectSchema } from './ProfileUpsertWithoutPostsInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutPostsInputObjectSchema } from './ProfileUpdateWithoutPostsInput.schema'
import { ProfileUncheckedUpdateWithoutPostsInputObjectSchema } from './ProfileUncheckedUpdateWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutPostsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileCreateWithoutPostsInputObjectSchema),
          z.lazy(() => ProfileUncheckedCreateWithoutPostsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProfileCreateOrConnectWithoutPostsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => ProfileUpsertWithoutPostsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProfileUpdateWithoutPostsInputObjectSchema),
          z.lazy(() => ProfileUncheckedUpdateWithoutPostsInputObjectSchema),
        ])
        .optional(),
    })
    .strict()

export const ProfileUpdateOneRequiredWithoutPostsNestedInputObjectSchema =
  Schema
