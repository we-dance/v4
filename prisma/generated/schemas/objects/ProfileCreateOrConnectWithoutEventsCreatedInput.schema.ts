import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutEventsCreatedInputObjectSchema } from './ProfileCreateWithoutEventsCreatedInput.schema'
import { ProfileUncheckedCreateWithoutEventsCreatedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsCreatedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutEventsCreatedInput> =
  z
    .object({
      where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ProfileCreateWithoutEventsCreatedInputObjectSchema),
        z.lazy(
          () => ProfileUncheckedCreateWithoutEventsCreatedInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ProfileCreateOrConnectWithoutEventsCreatedInputObjectSchema =
  Schema
