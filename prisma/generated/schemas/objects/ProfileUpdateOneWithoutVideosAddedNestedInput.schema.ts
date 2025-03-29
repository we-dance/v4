import { z } from 'zod'
import { ProfileCreateWithoutVideosAddedInputObjectSchema } from './ProfileCreateWithoutVideosAddedInput.schema'
import { ProfileUncheckedCreateWithoutVideosAddedInputObjectSchema } from './ProfileUncheckedCreateWithoutVideosAddedInput.schema'
import { ProfileCreateOrConnectWithoutVideosAddedInputObjectSchema } from './ProfileCreateOrConnectWithoutVideosAddedInput.schema'
import { ProfileUpsertWithoutVideosAddedInputObjectSchema } from './ProfileUpsertWithoutVideosAddedInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutVideosAddedInputObjectSchema } from './ProfileUpdateWithoutVideosAddedInput.schema'
import { ProfileUncheckedUpdateWithoutVideosAddedInputObjectSchema } from './ProfileUncheckedUpdateWithoutVideosAddedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateOneWithoutVideosAddedNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileCreateWithoutVideosAddedInputObjectSchema),
          z.lazy(
            () => ProfileUncheckedCreateWithoutVideosAddedInputObjectSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProfileCreateOrConnectWithoutVideosAddedInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => ProfileUpsertWithoutVideosAddedInputObjectSchema)
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProfileUpdateWithoutVideosAddedInputObjectSchema),
          z.lazy(
            () => ProfileUncheckedUpdateWithoutVideosAddedInputObjectSchema
          ),
        ])
        .optional(),
    })
    .strict()

export const ProfileUpdateOneWithoutVideosAddedNestedInputObjectSchema = Schema
