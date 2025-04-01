import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutCreatedByInputObjectSchema } from './ProfileUpdateWithoutCreatedByInput.schema'
import { ProfileUncheckedUpdateWithoutCreatedByInputObjectSchema } from './ProfileUncheckedUpdateWithoutCreatedByInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateWithWhereUniqueWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ProfileUpdateWithoutCreatedByInputObjectSchema),
        z.lazy(() => ProfileUncheckedUpdateWithoutCreatedByInputObjectSchema),
      ]),
    })
    .strict()

export const ProfileUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema =
  Schema
