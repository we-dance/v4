import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutFollowersInputObjectSchema } from './ProfileCreateWithoutFollowersInput.schema'
import { ProfileUncheckedCreateWithoutFollowersInputObjectSchema } from './ProfileUncheckedCreateWithoutFollowersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutFollowersInput> = z
  .object({
    where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutFollowersInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutFollowersInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileCreateOrConnectWithoutFollowersInputObjectSchema = Schema
