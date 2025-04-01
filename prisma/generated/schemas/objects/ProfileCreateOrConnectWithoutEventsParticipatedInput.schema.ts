import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutEventsParticipatedInputObjectSchema } from './ProfileCreateWithoutEventsParticipatedInput.schema'
import { ProfileUncheckedCreateWithoutEventsParticipatedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsParticipatedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutEventsParticipatedInput> =
  z
    .object({
      where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ProfileCreateWithoutEventsParticipatedInputObjectSchema),
        z.lazy(
          () => ProfileUncheckedCreateWithoutEventsParticipatedInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ProfileCreateOrConnectWithoutEventsParticipatedInputObjectSchema =
  Schema
