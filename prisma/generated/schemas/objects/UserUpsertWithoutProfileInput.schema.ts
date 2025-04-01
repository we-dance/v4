import { z } from 'zod'
import { UserUpdateWithoutProfileInputObjectSchema } from './UserUpdateWithoutProfileInput.schema'
import { UserUncheckedUpdateWithoutProfileInputObjectSchema } from './UserUncheckedUpdateWithoutProfileInput.schema'
import { UserCreateWithoutProfileInputObjectSchema } from './UserCreateWithoutProfileInput.schema'
import { UserUncheckedCreateWithoutProfileInputObjectSchema } from './UserUncheckedCreateWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpsertWithoutProfileInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutProfileInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutProfileInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutProfileInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutProfileInputObjectSchema),
    ]),
  })
  .strict()

export const UserUpsertWithoutProfileInputObjectSchema = Schema
