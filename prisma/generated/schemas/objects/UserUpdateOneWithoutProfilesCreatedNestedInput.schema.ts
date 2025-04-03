import { z } from 'zod'
import { UserCreateWithoutProfilesCreatedInputObjectSchema } from './UserCreateWithoutProfilesCreatedInput.schema'
import { UserUncheckedCreateWithoutProfilesCreatedInputObjectSchema } from './UserUncheckedCreateWithoutProfilesCreatedInput.schema'
import { UserCreateOrConnectWithoutProfilesCreatedInputObjectSchema } from './UserCreateOrConnectWithoutProfilesCreatedInput.schema'
import { UserUpsertWithoutProfilesCreatedInputObjectSchema } from './UserUpsertWithoutProfilesCreatedInput.schema'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserUpdateWithoutProfilesCreatedInputObjectSchema } from './UserUpdateWithoutProfilesCreatedInput.schema'
import { UserUncheckedUpdateWithoutProfilesCreatedInputObjectSchema } from './UserUncheckedUpdateWithoutProfilesCreatedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpdateOneWithoutProfilesCreatedNestedInput> =
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
      upsert: z
        .lazy(() => UserUpsertWithoutProfilesCreatedInputObjectSchema)
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutProfilesCreatedInputObjectSchema),
          z.lazy(
            () => UserUncheckedUpdateWithoutProfilesCreatedInputObjectSchema
          ),
        ])
        .optional(),
    })
    .strict()

export const UserUpdateOneWithoutProfilesCreatedNestedInputObjectSchema = Schema
