import { z } from 'zod'
import { ProfileCreateWithoutFollowingInputObjectSchema } from './ProfileCreateWithoutFollowingInput.schema'
import { ProfileUncheckedCreateWithoutFollowingInputObjectSchema } from './ProfileUncheckedCreateWithoutFollowingInput.schema'
import { ProfileCreateOrConnectWithoutFollowingInputObjectSchema } from './ProfileCreateOrConnectWithoutFollowingInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutFollowingInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProfileCreateWithoutFollowingInputObjectSchema),
        z.lazy(() => ProfileUncheckedCreateWithoutFollowingInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ProfileCreateOrConnectWithoutFollowingInputObjectSchema)
      .optional(),
    connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const ProfileCreateNestedOneWithoutFollowingInputObjectSchema = Schema
