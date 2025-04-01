import { z } from 'zod'
import { ProfileCreateWithoutEventsParticipatedInputObjectSchema } from './ProfileCreateWithoutEventsParticipatedInput.schema'
import { ProfileUncheckedCreateWithoutEventsParticipatedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsParticipatedInput.schema'
import { ProfileCreateOrConnectWithoutEventsParticipatedInputObjectSchema } from './ProfileCreateOrConnectWithoutEventsParticipatedInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutEventsParticipatedInput> =
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
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
    })
    .strict()

export const ProfileCreateNestedOneWithoutEventsParticipatedInputObjectSchema =
  Schema
