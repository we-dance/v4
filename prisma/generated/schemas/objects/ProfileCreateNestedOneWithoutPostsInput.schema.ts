import { z } from 'zod'
import { ProfileCreateWithoutPostsInputObjectSchema } from './ProfileCreateWithoutPostsInput.schema'
import { ProfileUncheckedCreateWithoutPostsInputObjectSchema } from './ProfileUncheckedCreateWithoutPostsInput.schema'
import { ProfileCreateOrConnectWithoutPostsInputObjectSchema } from './ProfileCreateOrConnectWithoutPostsInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutPostsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProfileCreateWithoutPostsInputObjectSchema),
        z.lazy(() => ProfileUncheckedCreateWithoutPostsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ProfileCreateOrConnectWithoutPostsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const ProfileCreateNestedOneWithoutPostsInputObjectSchema = Schema
