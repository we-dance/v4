import { z } from 'zod'
import { ProfileCreateWithoutEventsParticipatedInputObjectSchema } from './ProfileCreateWithoutEventsParticipatedInput.schema'
import { ProfileUncheckedCreateWithoutEventsParticipatedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsParticipatedInput.schema'
import { ProfileCreateOrConnectWithoutEventsParticipatedInputObjectSchema } from './ProfileCreateOrConnectWithoutEventsParticipatedInput.schema'
import { ProfileUpsertWithoutEventsParticipatedInputObjectSchema } from './ProfileUpsertWithoutEventsParticipatedInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutEventsParticipatedInputObjectSchema } from './ProfileUpdateWithoutEventsParticipatedInput.schema'
import { ProfileUncheckedUpdateWithoutEventsParticipatedInputObjectSchema } from './ProfileUncheckedUpdateWithoutEventsParticipatedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutEventsParticipatedNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileCreateWithoutEventsParticipatedInputObjectSchema),
          z.lazy(
            () =>
              ProfileUncheckedCreateWithoutEventsParticipatedInputObjectSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () => ProfileCreateOrConnectWithoutEventsParticipatedInputObjectSchema
        )
        .optional(),
      upsert: z
        .lazy(() => ProfileUpsertWithoutEventsParticipatedInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProfileUpdateWithoutEventsParticipatedInputObjectSchema),
          z.lazy(
            () =>
              ProfileUncheckedUpdateWithoutEventsParticipatedInputObjectSchema
          ),
        ])
        .optional(),
    })
    .strict()

export const ProfileUpdateOneRequiredWithoutEventsParticipatedNestedInputObjectSchema =
  Schema
