import { z } from 'zod'
import { UserUpdateWithoutProfilesCreatedInputObjectSchema } from './UserUpdateWithoutProfilesCreatedInput.schema'
import { UserUncheckedUpdateWithoutProfilesCreatedInputObjectSchema } from './UserUncheckedUpdateWithoutProfilesCreatedInput.schema'
import { UserCreateWithoutProfilesCreatedInputObjectSchema } from './UserCreateWithoutProfilesCreatedInput.schema'
import { UserUncheckedCreateWithoutProfilesCreatedInputObjectSchema } from './UserUncheckedCreateWithoutProfilesCreatedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpsertWithoutProfilesCreatedInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutProfilesCreatedInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutProfilesCreatedInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutProfilesCreatedInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutProfilesCreatedInputObjectSchema),
    ]),
  })
  .strict()

export const UserUpsertWithoutProfilesCreatedInputObjectSchema = Schema
