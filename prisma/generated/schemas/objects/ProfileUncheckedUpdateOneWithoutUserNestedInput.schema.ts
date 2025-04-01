import { z } from 'zod'
import { ProfileCreateWithoutUserInputObjectSchema } from './ProfileCreateWithoutUserInput.schema'
import { ProfileUncheckedCreateWithoutUserInputObjectSchema } from './ProfileUncheckedCreateWithoutUserInput.schema'
import { ProfileCreateOrConnectWithoutUserInputObjectSchema } from './ProfileCreateOrConnectWithoutUserInput.schema'
import { ProfileUpsertWithoutUserInputObjectSchema } from './ProfileUpsertWithoutUserInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutUserInputObjectSchema } from './ProfileUpdateWithoutUserInput.schema'
import { ProfileUncheckedUpdateWithoutUserInputObjectSchema } from './ProfileUncheckedUpdateWithoutUserInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUncheckedUpdateOneWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileCreateWithoutUserInputObjectSchema),
          z.lazy(() => ProfileUncheckedCreateWithoutUserInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProfileCreateOrConnectWithoutUserInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => ProfileUpsertWithoutUserInputObjectSchema)
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProfileUpdateWithoutUserInputObjectSchema),
          z.lazy(() => ProfileUncheckedUpdateWithoutUserInputObjectSchema),
        ])
        .optional(),
    })
    .strict()

export const ProfileUncheckedUpdateOneWithoutUserNestedInputObjectSchema =
  Schema
