import { z } from 'zod'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './ProfileFollowerWhereUniqueInput.schema'
import { ProfileFollowerUpdateWithoutProfileInputObjectSchema } from './ProfileFollowerUpdateWithoutProfileInput.schema'
import { ProfileFollowerUncheckedUpdateWithoutProfileInputObjectSchema } from './ProfileFollowerUncheckedUpdateWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerUpdateWithWhereUniqueWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ProfileFollowerUpdateWithoutProfileInputObjectSchema),
        z.lazy(
          () => ProfileFollowerUncheckedUpdateWithoutProfileInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ProfileFollowerUpdateWithWhereUniqueWithoutProfileInputObjectSchema =
  Schema
