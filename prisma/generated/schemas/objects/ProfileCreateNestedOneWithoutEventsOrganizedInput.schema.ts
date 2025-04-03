import { z } from 'zod'
import { ProfileCreateWithoutEventsOrganizedInputObjectSchema } from './ProfileCreateWithoutEventsOrganizedInput.schema'
import { ProfileUncheckedCreateWithoutEventsOrganizedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsOrganizedInput.schema'
import { ProfileCreateOrConnectWithoutEventsOrganizedInputObjectSchema } from './ProfileCreateOrConnectWithoutEventsOrganizedInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutEventsOrganizedInput> =
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
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
    })
    .strict()

export const ProfileCreateNestedOneWithoutEventsOrganizedInputObjectSchema =
  Schema
