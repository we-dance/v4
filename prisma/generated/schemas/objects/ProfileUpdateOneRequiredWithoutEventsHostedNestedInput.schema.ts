import { z } from 'zod'
import { ProfileCreateWithoutEventsHostedInputObjectSchema } from './ProfileCreateWithoutEventsHostedInput.schema'
import { ProfileUncheckedCreateWithoutEventsHostedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsHostedInput.schema'
import { ProfileCreateOrConnectWithoutEventsHostedInputObjectSchema } from './ProfileCreateOrConnectWithoutEventsHostedInput.schema'
import { ProfileUpsertWithoutEventsHostedInputObjectSchema } from './ProfileUpsertWithoutEventsHostedInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutEventsHostedInputObjectSchema } from './ProfileUpdateWithoutEventsHostedInput.schema'
import { ProfileUncheckedUpdateWithoutEventsHostedInputObjectSchema } from './ProfileUncheckedUpdateWithoutEventsHostedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutEventsHostedNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileCreateWithoutEventsHostedInputObjectSchema),
          z.lazy(
            () => ProfileUncheckedCreateWithoutEventsHostedInputObjectSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProfileCreateOrConnectWithoutEventsHostedInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => ProfileUpsertWithoutEventsHostedInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProfileUpdateWithoutEventsHostedInputObjectSchema),
          z.lazy(
            () => ProfileUncheckedUpdateWithoutEventsHostedInputObjectSchema
          ),
        ])
        .optional(),
    })
    .strict()

export const ProfileUpdateOneRequiredWithoutEventsHostedNestedInputObjectSchema =
  Schema
