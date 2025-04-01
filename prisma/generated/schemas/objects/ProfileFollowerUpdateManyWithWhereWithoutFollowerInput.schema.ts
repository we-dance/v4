import { z } from 'zod'
import { ProfileFollowerScalarWhereInputObjectSchema } from './ProfileFollowerScalarWhereInput.schema'
import { ProfileFollowerUpdateManyMutationInputObjectSchema } from './ProfileFollowerUpdateManyMutationInput.schema'
import { ProfileFollowerUncheckedUpdateManyWithoutFollowingInputObjectSchema } from './ProfileFollowerUncheckedUpdateManyWithoutFollowingInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerUpdateManyWithWhereWithoutFollowerInput> =
  z
    .object({
      where: z.lazy(() => ProfileFollowerScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ProfileFollowerUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            ProfileFollowerUncheckedUpdateManyWithoutFollowingInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ProfileFollowerUpdateManyWithWhereWithoutFollowerInputObjectSchema =
  Schema
