import { z } from 'zod'
import { UserCreateWithoutProfilesCreatedInputObjectSchema } from './UserCreateWithoutProfilesCreatedInput.schema'
import { UserUncheckedCreateWithoutProfilesCreatedInputObjectSchema } from './UserUncheckedCreateWithoutProfilesCreatedInput.schema'
import { UserCreateOrConnectWithoutProfilesCreatedInputObjectSchema } from './UserCreateOrConnectWithoutProfilesCreatedInput.schema'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutProfilesCreatedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutProfilesCreatedInputObjectSchema),
          z.lazy(
            () => UserUncheckedCreateWithoutProfilesCreatedInputObjectSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutProfilesCreatedInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict()

export const UserCreateNestedOneWithoutProfilesCreatedInputObjectSchema = Schema
