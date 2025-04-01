import { z } from 'zod'
import { ProfileCreateWithoutEventsCreatedInputObjectSchema } from './ProfileCreateWithoutEventsCreatedInput.schema'
import { ProfileUncheckedCreateWithoutEventsCreatedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsCreatedInput.schema'
import { ProfileCreateOrConnectWithoutEventsCreatedInputObjectSchema } from './ProfileCreateOrConnectWithoutEventsCreatedInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutEventsCreatedInput> =
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
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
    })
    .strict()

export const ProfileCreateNestedOneWithoutEventsCreatedInputObjectSchema =
  Schema
