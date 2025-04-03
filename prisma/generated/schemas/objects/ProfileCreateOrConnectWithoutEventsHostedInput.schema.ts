import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutEventsHostedInputObjectSchema } from './ProfileCreateWithoutEventsHostedInput.schema'
import { ProfileUncheckedCreateWithoutEventsHostedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsHostedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutEventsHostedInput> =
  z
    .object({
      where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ProfileCreateWithoutEventsHostedInputObjectSchema),
        z.lazy(
          () => ProfileUncheckedCreateWithoutEventsHostedInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ProfileCreateOrConnectWithoutEventsHostedInputObjectSchema = Schema
