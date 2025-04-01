import { z } from 'zod'
import { ProfileUpdateWithoutEventsParticipatedInputObjectSchema } from './ProfileUpdateWithoutEventsParticipatedInput.schema'
import { ProfileUncheckedUpdateWithoutEventsParticipatedInputObjectSchema } from './ProfileUncheckedUpdateWithoutEventsParticipatedInput.schema'
import { ProfileCreateWithoutEventsParticipatedInputObjectSchema } from './ProfileCreateWithoutEventsParticipatedInput.schema'
import { ProfileUncheckedCreateWithoutEventsParticipatedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsParticipatedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpsertWithoutEventsParticipatedInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutEventsParticipatedInputObjectSchema),
      z.lazy(
        () => ProfileUncheckedUpdateWithoutEventsParticipatedInputObjectSchema
      ),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutEventsParticipatedInputObjectSchema),
      z.lazy(
        () => ProfileUncheckedCreateWithoutEventsParticipatedInputObjectSchema
      ),
    ]),
  })
  .strict()

export const ProfileUpsertWithoutEventsParticipatedInputObjectSchema = Schema
