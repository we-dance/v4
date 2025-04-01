import { z } from 'zod'
import { ProfileUpdateWithoutVideosAddedInputObjectSchema } from './ProfileUpdateWithoutVideosAddedInput.schema'
import { ProfileUncheckedUpdateWithoutVideosAddedInputObjectSchema } from './ProfileUncheckedUpdateWithoutVideosAddedInput.schema'
import { ProfileCreateWithoutVideosAddedInputObjectSchema } from './ProfileCreateWithoutVideosAddedInput.schema'
import { ProfileUncheckedCreateWithoutVideosAddedInputObjectSchema } from './ProfileUncheckedCreateWithoutVideosAddedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpsertWithoutVideosAddedInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutVideosAddedInputObjectSchema),
      z.lazy(() => ProfileUncheckedUpdateWithoutVideosAddedInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutVideosAddedInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutVideosAddedInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileUpsertWithoutVideosAddedInputObjectSchema = Schema
