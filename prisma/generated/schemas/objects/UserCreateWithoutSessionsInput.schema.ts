import { z } from 'zod'
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'
import { ProfileCreateNestedOneWithoutUserInputObjectSchema } from './ProfileCreateNestedOneWithoutUserInput.schema'
import { ProfileCreateNestedManyWithoutCreatedByInputObjectSchema } from './ProfileCreateNestedManyWithoutCreatedByInput.schema'
import { AccountCreateNestedManyWithoutUserInputObjectSchema } from './AccountCreateNestedManyWithoutUserInput.schema'

import type { Prisma } from '@prisma/client'

const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ])
)

const Schema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z
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
    profile: z
      .lazy(() => ProfileCreateNestedOneWithoutUserInputObjectSchema)
      .optional(),
    profilesCreated: z
      .lazy(() => ProfileCreateNestedManyWithoutCreatedByInputObjectSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict()

export const UserCreateWithoutSessionsInputObjectSchema = Schema
