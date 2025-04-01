import { z } from 'zod'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './ProfileFollowerWhereUniqueInput.schema'
import { ProfileFollowerUpdateWithoutFollowerInputObjectSchema } from './ProfileFollowerUpdateWithoutFollowerInput.schema'
import { ProfileFollowerUncheckedUpdateWithoutFollowerInputObjectSchema } from './ProfileFollowerUncheckedUpdateWithoutFollowerInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerUpdateWithWhereUniqueWithoutFollowerInput> =
  z
    .object({
      where: z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ProfileFollowerUpdateWithoutFollowerInputObjectSchema),
        z.lazy(
          () => ProfileFollowerUncheckedUpdateWithoutFollowerInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ProfileFollowerUpdateWithWhereUniqueWithoutFollowerInputObjectSchema =
  Schema
