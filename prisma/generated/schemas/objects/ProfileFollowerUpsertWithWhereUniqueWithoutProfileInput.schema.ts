import { z } from 'zod'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './ProfileFollowerWhereUniqueInput.schema'
import { ProfileFollowerUpdateWithoutProfileInputObjectSchema } from './ProfileFollowerUpdateWithoutProfileInput.schema'
import { ProfileFollowerUncheckedUpdateWithoutProfileInputObjectSchema } from './ProfileFollowerUncheckedUpdateWithoutProfileInput.schema'
import { ProfileFollowerCreateWithoutProfileInputObjectSchema } from './ProfileFollowerCreateWithoutProfileInput.schema'
import { ProfileFollowerUncheckedCreateWithoutProfileInputObjectSchema } from './ProfileFollowerUncheckedCreateWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerUpsertWithWhereUniqueWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ProfileFollowerUpdateWithoutProfileInputObjectSchema),
        z.lazy(
          () => ProfileFollowerUncheckedUpdateWithoutProfileInputObjectSchema
        ),
      ]),
      create: z.union([
        z.lazy(() => ProfileFollowerCreateWithoutProfileInputObjectSchema),
        z.lazy(
          () => ProfileFollowerUncheckedCreateWithoutProfileInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ProfileFollowerUpsertWithWhereUniqueWithoutProfileInputObjectSchema =
  Schema
