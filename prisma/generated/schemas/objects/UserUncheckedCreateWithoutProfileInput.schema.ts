import { z } from 'zod'
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'
import { ProfileUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema } from './ProfileUncheckedCreateNestedManyWithoutCreatedByInput.schema'
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutUserInput.schema'
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutUserInput.schema'

import type { Prisma } from '@prisma/client'

const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ])
)

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutProfileInput> = z
  .object({
    id: z.string().optional(),
    email: z.string(),
    name: z.string().optional().nullable(),
    firstName: z.string().optional().nullable(),
    lastName: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    emailConsent: z.boolean().optional(),
    emailConsentAt: z.coerce.date().optional().nullable(),
    salt: z.string().optional(),
    hash: z.string().optional(),
    firebaseId: z.string().optional(),
    emailVerified: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    deletedAt: z.coerce.date().optional().nullable(),
    deletedReason: z.string().optional().nullable(),
    notificationSettings: z
      .union([z.lazy(() => JsonNullValueInputSchema), jsonSchema])
      .optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    lastLoginAt: z.coerce.date().optional(),
    profilesCreated: z
      .lazy(
        () => ProfileUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema
      )
      .optional(),
    accounts: z
      .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    sessions: z
      .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict()

export const UserUncheckedCreateWithoutProfileInputObjectSchema = Schema
