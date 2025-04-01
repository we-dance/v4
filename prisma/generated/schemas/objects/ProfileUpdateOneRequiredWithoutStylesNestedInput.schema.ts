import { z } from 'zod'
import { ProfileCreateWithoutStylesInputObjectSchema } from './ProfileCreateWithoutStylesInput.schema'
import { ProfileUncheckedCreateWithoutStylesInputObjectSchema } from './ProfileUncheckedCreateWithoutStylesInput.schema'
import { ProfileCreateOrConnectWithoutStylesInputObjectSchema } from './ProfileCreateOrConnectWithoutStylesInput.schema'
import { ProfileUpsertWithoutStylesInputObjectSchema } from './ProfileUpsertWithoutStylesInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutStylesInputObjectSchema } from './ProfileUpdateWithoutStylesInput.schema'
import { ProfileUncheckedUpdateWithoutStylesInputObjectSchema } from './ProfileUncheckedUpdateWithoutStylesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutStylesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileCreateWithoutStylesInputObjectSchema),
          z.lazy(() => ProfileUncheckedCreateWithoutStylesInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProfileCreateOrConnectWithoutStylesInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => ProfileUpsertWithoutStylesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProfileUpdateWithoutStylesInputObjectSchema),
          z.lazy(() => ProfileUncheckedUpdateWithoutStylesInputObjectSchema),
        ])
        .optional(),
    })
    .strict()

export const ProfileUpdateOneRequiredWithoutStylesNestedInputObjectSchema =
  Schema
