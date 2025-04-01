import { z } from 'zod'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserCreateWithoutProfilesCreatedInputObjectSchema } from './UserCreateWithoutProfilesCreatedInput.schema'
import { UserUncheckedCreateWithoutProfilesCreatedInputObjectSchema } from './UserUncheckedCreateWithoutProfilesCreatedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutProfilesCreatedInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutProfilesCreatedInputObjectSchema),
        z.lazy(
          () => UserUncheckedCreateWithoutProfilesCreatedInputObjectSchema
        ),
      ]),
    })
    .strict()

export const UserCreateOrConnectWithoutProfilesCreatedInputObjectSchema = Schema
