import { z } from 'zod'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './ProfileFollowerWhereUniqueInput.schema'
import { ProfileFollowerUpdateWithoutFollowerInputObjectSchema } from './ProfileFollowerUpdateWithoutFollowerInput.schema'
import { ProfileFollowerUncheckedUpdateWithoutFollowerInputObjectSchema } from './ProfileFollowerUncheckedUpdateWithoutFollowerInput.schema'
import { ProfileFollowerCreateWithoutFollowerInputObjectSchema } from './ProfileFollowerCreateWithoutFollowerInput.schema'
import { ProfileFollowerUncheckedCreateWithoutFollowerInputObjectSchema } from './ProfileFollowerUncheckedCreateWithoutFollowerInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerUpsertWithWhereUniqueWithoutFollowerInput> =
  z
    .object({
      where: z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ProfileFollowerUpdateWithoutFollowerInputObjectSchema),
        z.lazy(
          () => ProfileFollowerUncheckedUpdateWithoutFollowerInputObjectSchema
        ),
      ]),
      create: z.union([
        z.lazy(() => ProfileFollowerCreateWithoutFollowerInputObjectSchema),
        z.lazy(
          () => ProfileFollowerUncheckedCreateWithoutFollowerInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ProfileFollowerUpsertWithWhereUniqueWithoutFollowerInputObjectSchema =
  Schema
