import { z } from 'zod'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './ProfileFollowerWhereUniqueInput.schema'
import { ProfileFollowerCreateWithoutProfileInputObjectSchema } from './ProfileFollowerCreateWithoutProfileInput.schema'
import { ProfileFollowerUncheckedCreateWithoutProfileInputObjectSchema } from './ProfileFollowerUncheckedCreateWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerCreateOrConnectWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ProfileFollowerCreateWithoutProfileInputObjectSchema),
        z.lazy(
          () => ProfileFollowerUncheckedCreateWithoutProfileInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ProfileFollowerCreateOrConnectWithoutProfileInputObjectSchema =
  Schema
