import { z } from 'zod'
import { ProfileUpdateWithoutCitiesInputObjectSchema } from './ProfileUpdateWithoutCitiesInput.schema'
import { ProfileUncheckedUpdateWithoutCitiesInputObjectSchema } from './ProfileUncheckedUpdateWithoutCitiesInput.schema'
import { ProfileCreateWithoutCitiesInputObjectSchema } from './ProfileCreateWithoutCitiesInput.schema'
import { ProfileUncheckedCreateWithoutCitiesInputObjectSchema } from './ProfileUncheckedCreateWithoutCitiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpsertWithoutCitiesInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutCitiesInputObjectSchema),
      z.lazy(() => ProfileUncheckedUpdateWithoutCitiesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutCitiesInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutCitiesInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileUpsertWithoutCitiesInputObjectSchema = Schema
