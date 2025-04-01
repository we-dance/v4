import { z } from 'zod'
import { ProfileUpdateWithoutStylesInputObjectSchema } from './ProfileUpdateWithoutStylesInput.schema'
import { ProfileUncheckedUpdateWithoutStylesInputObjectSchema } from './ProfileUncheckedUpdateWithoutStylesInput.schema'
import { ProfileCreateWithoutStylesInputObjectSchema } from './ProfileCreateWithoutStylesInput.schema'
import { ProfileUncheckedCreateWithoutStylesInputObjectSchema } from './ProfileUncheckedCreateWithoutStylesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpsertWithoutStylesInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutStylesInputObjectSchema),
      z.lazy(() => ProfileUncheckedUpdateWithoutStylesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutStylesInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutStylesInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileUpsertWithoutStylesInputObjectSchema = Schema
