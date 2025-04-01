import { z } from 'zod'
import { ProfileUpdateWithoutVotesInputObjectSchema } from './ProfileUpdateWithoutVotesInput.schema'
import { ProfileUncheckedUpdateWithoutVotesInputObjectSchema } from './ProfileUncheckedUpdateWithoutVotesInput.schema'
import { ProfileCreateWithoutVotesInputObjectSchema } from './ProfileCreateWithoutVotesInput.schema'
import { ProfileUncheckedCreateWithoutVotesInputObjectSchema } from './ProfileUncheckedCreateWithoutVotesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpsertWithoutVotesInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutVotesInputObjectSchema),
      z.lazy(() => ProfileUncheckedUpdateWithoutVotesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutVotesInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutVotesInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileUpsertWithoutVotesInputObjectSchema = Schema
