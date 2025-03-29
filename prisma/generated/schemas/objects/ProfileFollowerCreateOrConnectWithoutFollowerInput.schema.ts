import { z } from 'zod'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './ProfileFollowerWhereUniqueInput.schema'
import { ProfileFollowerCreateWithoutFollowerInputObjectSchema } from './ProfileFollowerCreateWithoutFollowerInput.schema'
import { ProfileFollowerUncheckedCreateWithoutFollowerInputObjectSchema } from './ProfileFollowerUncheckedCreateWithoutFollowerInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerCreateOrConnectWithoutFollowerInput> =
  z
    .object({
      where: z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ProfileFollowerCreateWithoutFollowerInputObjectSchema),
        z.lazy(
          () => ProfileFollowerUncheckedCreateWithoutFollowerInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ProfileFollowerCreateOrConnectWithoutFollowerInputObjectSchema =
  Schema
