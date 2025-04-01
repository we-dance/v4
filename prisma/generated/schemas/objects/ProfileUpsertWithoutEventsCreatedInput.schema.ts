import { z } from 'zod'
import { ProfileUpdateWithoutEventsCreatedInputObjectSchema } from './ProfileUpdateWithoutEventsCreatedInput.schema'
import { ProfileUncheckedUpdateWithoutEventsCreatedInputObjectSchema } from './ProfileUncheckedUpdateWithoutEventsCreatedInput.schema'
import { ProfileCreateWithoutEventsCreatedInputObjectSchema } from './ProfileCreateWithoutEventsCreatedInput.schema'
import { ProfileUncheckedCreateWithoutEventsCreatedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsCreatedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpsertWithoutEventsCreatedInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutEventsCreatedInputObjectSchema),
      z.lazy(() => ProfileUncheckedUpdateWithoutEventsCreatedInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutEventsCreatedInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutEventsCreatedInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileUpsertWithoutEventsCreatedInputObjectSchema = Schema
