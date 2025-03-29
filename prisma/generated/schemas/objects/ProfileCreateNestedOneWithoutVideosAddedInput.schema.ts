import { z } from 'zod'
import { ProfileCreateWithoutVideosAddedInputObjectSchema } from './ProfileCreateWithoutVideosAddedInput.schema'
import { ProfileUncheckedCreateWithoutVideosAddedInputObjectSchema } from './ProfileUncheckedCreateWithoutVideosAddedInput.schema'
import { ProfileCreateOrConnectWithoutVideosAddedInputObjectSchema } from './ProfileCreateOrConnectWithoutVideosAddedInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutVideosAddedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileCreateWithoutVideosAddedInputObjectSchema),
          z.lazy(
            () => ProfileUncheckedCreateWithoutVideosAddedInputObjectSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProfileCreateOrConnectWithoutVideosAddedInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
    })
    .strict()

export const ProfileCreateNestedOneWithoutVideosAddedInputObjectSchema = Schema
