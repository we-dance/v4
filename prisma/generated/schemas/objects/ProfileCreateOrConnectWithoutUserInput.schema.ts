import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutUserInputObjectSchema } from './ProfileCreateWithoutUserInput.schema'
import { ProfileUncheckedCreateWithoutUserInputObjectSchema } from './ProfileUncheckedCreateWithoutUserInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutUserInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileCreateOrConnectWithoutUserInputObjectSchema = Schema
