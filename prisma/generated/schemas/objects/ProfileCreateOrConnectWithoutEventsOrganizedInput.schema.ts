import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutEventsOrganizedInputObjectSchema } from './ProfileCreateWithoutEventsOrganizedInput.schema'
import { ProfileUncheckedCreateWithoutEventsOrganizedInputObjectSchema } from './ProfileUncheckedCreateWithoutEventsOrganizedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutEventsOrganizedInput> =
  z
    .object({
      where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ProfileCreateWithoutEventsOrganizedInputObjectSchema),
        z.lazy(
          () => ProfileUncheckedCreateWithoutEventsOrganizedInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ProfileCreateOrConnectWithoutEventsOrganizedInputObjectSchema =
  Schema
