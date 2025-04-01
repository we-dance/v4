import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutFollowingInputObjectSchema } from './ProfileCreateWithoutFollowingInput.schema'
import { ProfileUncheckedCreateWithoutFollowingInputObjectSchema } from './ProfileUncheckedCreateWithoutFollowingInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutFollowingInput> = z
  .object({
    where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutFollowingInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutFollowingInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileCreateOrConnectWithoutFollowingInputObjectSchema = Schema
