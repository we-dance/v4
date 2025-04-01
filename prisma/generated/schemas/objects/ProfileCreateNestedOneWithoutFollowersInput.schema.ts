import { z } from 'zod'
import { ProfileCreateWithoutFollowersInputObjectSchema } from './ProfileCreateWithoutFollowersInput.schema'
import { ProfileUncheckedCreateWithoutFollowersInputObjectSchema } from './ProfileUncheckedCreateWithoutFollowersInput.schema'
import { ProfileCreateOrConnectWithoutFollowersInputObjectSchema } from './ProfileCreateOrConnectWithoutFollowersInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutFollowersInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProfileCreateWithoutFollowersInputObjectSchema),
        z.lazy(() => ProfileUncheckedCreateWithoutFollowersInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ProfileCreateOrConnectWithoutFollowersInputObjectSchema)
      .optional(),
    connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const ProfileCreateNestedOneWithoutFollowersInputObjectSchema = Schema
