import { z } from 'zod'
import { ProfileCreateWithoutEventsHostedInputObjectSchema } from './ProfileCreateWithoutEventsHostedInput.schema'
import { ProfileUncheckedCreateWithoutEventsHostedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsHostedInput.schema'
import { ProfileCreateOrConnectWithoutEventsHostedInputObjectSchema } from './ProfileCreateOrConnectWithoutEventsHostedInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutEventsHostedInput> =
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
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
    })
    .strict()

export const ProfileCreateNestedOneWithoutEventsHostedInputObjectSchema = Schema
