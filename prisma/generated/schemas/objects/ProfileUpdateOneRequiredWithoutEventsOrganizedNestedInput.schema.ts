import { z } from 'zod'
import { ProfileCreateWithoutEventsOrganizedInputObjectSchema } from './ProfileCreateWithoutEventsOrganizedInput.schema'
import { ProfileUncheckedCreateWithoutEventsOrganizedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsOrganizedInput.schema'
import { ProfileCreateOrConnectWithoutEventsOrganizedInputObjectSchema } from './ProfileCreateOrConnectWithoutEventsOrganizedInput.schema'
import { ProfileUpsertWithoutEventsOrganizedInputObjectSchema } from './ProfileUpsertWithoutEventsOrganizedInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutEventsOrganizedInputObjectSchema } from './ProfileUpdateWithoutEventsOrganizedInput.schema'
import { ProfileUncheckedUpdateWithoutEventsOrganizedInputObjectSchema } from './ProfileUncheckedUpdateWithoutEventsOrganizedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutEventsOrganizedNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileCreateWithoutEventsOrganizedInputObjectSchema),
          z.lazy(
            () => ProfileUncheckedCreateWithoutEventsOrganizedInputObjectSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () => ProfileCreateOrConnectWithoutEventsOrganizedInputObjectSchema
        )
        .optional(),
      upsert: z
        .lazy(() => ProfileUpsertWithoutEventsOrganizedInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProfileUpdateWithoutEventsOrganizedInputObjectSchema),
          z.lazy(
            () => ProfileUncheckedUpdateWithoutEventsOrganizedInputObjectSchema
          ),
        ])
        .optional(),
    })
    .strict()

export const ProfileUpdateOneRequiredWithoutEventsOrganizedNestedInputObjectSchema =
  Schema
