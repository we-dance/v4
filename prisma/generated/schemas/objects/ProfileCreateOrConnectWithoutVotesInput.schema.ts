import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutVotesInputObjectSchema } from './ProfileCreateWithoutVotesInput.schema'
import { ProfileUncheckedCreateWithoutVotesInputObjectSchema } from './ProfileUncheckedCreateWithoutVotesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutVotesInput> = z
  .object({
    where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutVotesInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutVotesInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileCreateOrConnectWithoutVotesInputObjectSchema = Schema
