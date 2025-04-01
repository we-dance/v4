import { z } from 'zod'
import { ProfileFollowerScalarWhereInputObjectSchema } from './ProfileFollowerScalarWhereInput.schema'
import { ProfileFollowerUpdateManyMutationInputObjectSchema } from './ProfileFollowerUpdateManyMutationInput.schema'
import { ProfileFollowerUncheckedUpdateManyWithoutFollowersInputObjectSchema } from './ProfileFollowerUncheckedUpdateManyWithoutFollowersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerUpdateManyWithWhereWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => ProfileFollowerScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ProfileFollowerUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            ProfileFollowerUncheckedUpdateManyWithoutFollowersInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ProfileFollowerUpdateManyWithWhereWithoutProfileInputObjectSchema =
  Schema
