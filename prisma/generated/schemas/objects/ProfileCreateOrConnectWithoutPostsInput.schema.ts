import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutPostsInputObjectSchema } from './ProfileCreateWithoutPostsInput.schema'
import { ProfileUncheckedCreateWithoutPostsInputObjectSchema } from './ProfileUncheckedCreateWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutPostsInput> = z
  .object({
    where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutPostsInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutPostsInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileCreateOrConnectWithoutPostsInputObjectSchema = Schema
