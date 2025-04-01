import { z } from 'zod'
import { ProfileCreateWithoutCitiesInputObjectSchema } from './ProfileCreateWithoutCitiesInput.schema'
import { ProfileUncheckedCreateWithoutCitiesInputObjectSchema } from './ProfileUncheckedCreateWithoutCitiesInput.schema'
import { ProfileCreateOrConnectWithoutCitiesInputObjectSchema } from './ProfileCreateOrConnectWithoutCitiesInput.schema'
import { ProfileUpsertWithoutCitiesInputObjectSchema } from './ProfileUpsertWithoutCitiesInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutCitiesInputObjectSchema } from './ProfileUpdateWithoutCitiesInput.schema'
import { ProfileUncheckedUpdateWithoutCitiesInputObjectSchema } from './ProfileUncheckedUpdateWithoutCitiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutCitiesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileCreateWithoutCitiesInputObjectSchema),
          z.lazy(() => ProfileUncheckedCreateWithoutCitiesInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProfileCreateOrConnectWithoutCitiesInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => ProfileUpsertWithoutCitiesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProfileUpdateWithoutCitiesInputObjectSchema),
          z.lazy(() => ProfileUncheckedUpdateWithoutCitiesInputObjectSchema),
        ])
        .optional(),
    })
    .strict()

export const ProfileUpdateOneRequiredWithoutCitiesNestedInputObjectSchema =
  Schema
