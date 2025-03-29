import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutVideosAddedInputObjectSchema } from './ProfileCreateWithoutVideosAddedInput.schema'
import { ProfileUncheckedCreateWithoutVideosAddedInputObjectSchema } from './ProfileUncheckedCreateWithoutVideosAddedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutVideosAddedInput> =
  z
    .object({
      where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ProfileCreateWithoutVideosAddedInputObjectSchema),
        z.lazy(() => ProfileUncheckedCreateWithoutVideosAddedInputObjectSchema),
      ]),
    })
    .strict()

export const ProfileCreateOrConnectWithoutVideosAddedInputObjectSchema = Schema
