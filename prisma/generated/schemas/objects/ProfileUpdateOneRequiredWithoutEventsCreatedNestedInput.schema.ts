import { z } from 'zod'
import { ProfileCreateWithoutEventsCreatedInputObjectSchema } from './ProfileCreateWithoutEventsCreatedInput.schema'
import { ProfileUncheckedCreateWithoutEventsCreatedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsCreatedInput.schema'
import { ProfileCreateOrConnectWithoutEventsCreatedInputObjectSchema } from './ProfileCreateOrConnectWithoutEventsCreatedInput.schema'
import { ProfileUpsertWithoutEventsCreatedInputObjectSchema } from './ProfileUpsertWithoutEventsCreatedInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutEventsCreatedInputObjectSchema } from './ProfileUpdateWithoutEventsCreatedInput.schema'
import { ProfileUncheckedUpdateWithoutEventsCreatedInputObjectSchema } from './ProfileUncheckedUpdateWithoutEventsCreatedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutEventsCreatedNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileCreateWithoutEventsCreatedInputObjectSchema),
          z.lazy(
            () => ProfileUncheckedCreateWithoutEventsCreatedInputObjectSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProfileCreateOrConnectWithoutEventsCreatedInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => ProfileUpsertWithoutEventsCreatedInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProfileUpdateWithoutEventsCreatedInputObjectSchema),
          z.lazy(
            () => ProfileUncheckedUpdateWithoutEventsCreatedInputObjectSchema
          ),
        ])
        .optional(),
    })
    .strict()

export const ProfileUpdateOneRequiredWithoutEventsCreatedNestedInputObjectSchema =
  Schema
