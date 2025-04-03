import { z } from 'zod'
import { ProfileCreateWithoutVotesInputObjectSchema } from './ProfileCreateWithoutVotesInput.schema'
import { ProfileUncheckedCreateWithoutVotesInputObjectSchema } from './ProfileUncheckedCreateWithoutVotesInput.schema'
import { ProfileCreateOrConnectWithoutVotesInputObjectSchema } from './ProfileCreateOrConnectWithoutVotesInput.schema'
import { ProfileUpsertWithoutVotesInputObjectSchema } from './ProfileUpsertWithoutVotesInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutVotesInputObjectSchema } from './ProfileUpdateWithoutVotesInput.schema'
import { ProfileUncheckedUpdateWithoutVotesInputObjectSchema } from './ProfileUncheckedUpdateWithoutVotesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutVotesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileCreateWithoutVotesInputObjectSchema),
          z.lazy(() => ProfileUncheckedCreateWithoutVotesInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProfileCreateOrConnectWithoutVotesInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => ProfileUpsertWithoutVotesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProfileUpdateWithoutVotesInputObjectSchema),
          z.lazy(() => ProfileUncheckedUpdateWithoutVotesInputObjectSchema),
        ])
        .optional(),
    })
    .strict()

export const ProfileUpdateOneRequiredWithoutVotesNestedInputObjectSchema =
  Schema
