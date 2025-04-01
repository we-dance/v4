import { z } from 'zod'
import { ProfileUpdateWithoutPostsInputObjectSchema } from './ProfileUpdateWithoutPostsInput.schema'
import { ProfileUncheckedUpdateWithoutPostsInputObjectSchema } from './ProfileUncheckedUpdateWithoutPostsInput.schema'
import { ProfileCreateWithoutPostsInputObjectSchema } from './ProfileCreateWithoutPostsInput.schema'
import { ProfileUncheckedCreateWithoutPostsInputObjectSchema } from './ProfileUncheckedCreateWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpsertWithoutPostsInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutPostsInputObjectSchema),
      z.lazy(() => ProfileUncheckedUpdateWithoutPostsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutPostsInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutPostsInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileUpsertWithoutPostsInputObjectSchema = Schema
