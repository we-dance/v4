import { z } from 'zod'
import { ProfileUpdateWithoutEventsOrganizedInputObjectSchema } from './ProfileUpdateWithoutEventsOrganizedInput.schema'
import { ProfileUncheckedUpdateWithoutEventsOrganizedInputObjectSchema } from './ProfileUncheckedUpdateWithoutEventsOrganizedInput.schema'
import { ProfileCreateWithoutEventsOrganizedInputObjectSchema } from './ProfileCreateWithoutEventsOrganizedInput.schema'
import { ProfileUncheckedCreateWithoutEventsOrganizedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsOrganizedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpsertWithoutEventsOrganizedInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutEventsOrganizedInputObjectSchema),
      z.lazy(
        () => ProfileUncheckedUpdateWithoutEventsOrganizedInputObjectSchema
      ),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutEventsOrganizedInputObjectSchema),
      z.lazy(
        () => ProfileUncheckedCreateWithoutEventsOrganizedInputObjectSchema
      ),
    ]),
  })
  .strict()

export const ProfileUpsertWithoutEventsOrganizedInputObjectSchema = Schema
