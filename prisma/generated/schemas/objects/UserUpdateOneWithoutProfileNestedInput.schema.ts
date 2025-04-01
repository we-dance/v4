import { z } from 'zod'
import { UserCreateWithoutProfileInputObjectSchema } from './UserCreateWithoutProfileInput.schema'
import { UserUncheckedCreateWithoutProfileInputObjectSchema } from './UserUncheckedCreateWithoutProfileInput.schema'
import { UserCreateOrConnectWithoutProfileInputObjectSchema } from './UserCreateOrConnectWithoutProfileInput.schema'
import { UserUpsertWithoutProfileInputObjectSchema } from './UserUpsertWithoutProfileInput.schema'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserUpdateWithoutProfileInputObjectSchema } from './UserUpdateWithoutProfileInput.schema'
import { UserUncheckedUpdateWithoutProfileInputObjectSchema } from './UserUncheckedUpdateWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpdateOneWithoutProfileNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutProfileInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutProfileInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutProfileInputObjectSchema)
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutProfileInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithoutProfileInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutProfileInputObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const UserUpdateOneWithoutProfileNestedInputObjectSchema = Schema
