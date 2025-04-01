import { z } from 'zod'
import { ProfileCreateWithoutVotesInputObjectSchema } from './ProfileCreateWithoutVotesInput.schema'
import { ProfileUncheckedCreateWithoutVotesInputObjectSchema } from './ProfileUncheckedCreateWithoutVotesInput.schema'
import { ProfileCreateOrConnectWithoutVotesInputObjectSchema } from './ProfileCreateOrConnectWithoutVotesInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutVotesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProfileCreateWithoutVotesInputObjectSchema),
        z.lazy(() => ProfileUncheckedCreateWithoutVotesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ProfileCreateOrConnectWithoutVotesInputObjectSchema)
      .optional(),
    connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const ProfileCreateNestedOneWithoutVotesInputObjectSchema = Schema
