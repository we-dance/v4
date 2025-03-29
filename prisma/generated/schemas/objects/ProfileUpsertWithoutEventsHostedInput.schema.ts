import { z } from 'zod'
import { ProfileUpdateWithoutEventsHostedInputObjectSchema } from './ProfileUpdateWithoutEventsHostedInput.schema'
import { ProfileUncheckedUpdateWithoutEventsHostedInputObjectSchema } from './ProfileUncheckedUpdateWithoutEventsHostedInput.schema'
import { ProfileCreateWithoutEventsHostedInputObjectSchema } from './ProfileCreateWithoutEventsHostedInput.schema'
import { ProfileUncheckedCreateWithoutEventsHostedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsHostedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpsertWithoutEventsHostedInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutEventsHostedInputObjectSchema),
      z.lazy(() => ProfileUncheckedUpdateWithoutEventsHostedInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutEventsHostedInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutEventsHostedInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileUpsertWithoutEventsHostedInputObjectSchema = Schema
