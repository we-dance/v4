import { z } from 'zod'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'
import { ProfileFindManySchema } from '../findManyProfile.schema'
import { AccountFindManySchema } from '../findManyAccount.schema'
import { SessionFindManySchema } from '../findManySession.schema'
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    name: z.boolean().optional(),
    firstName: z.boolean().optional(),
    lastName: z.boolean().optional(),
    phone: z.boolean().optional(),
    emailConsent: z.boolean().optional(),
    emailConsentAt: z.boolean().optional(),
    salt: z.boolean().optional(),
    hash: z.boolean().optional(),
    firebaseId: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    deletedAt: z.boolean().optional(),
    deletedReason: z.boolean().optional(),
    notificationSettings: z.boolean().optional(),
    profile: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    profilesCreated: z
      .union([z.boolean(), z.lazy(() => ProfileFindManySchema)])
      .optional(),
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManySchema)])
      .optional(),
    sessions: z
      .union([z.boolean(), z.lazy(() => SessionFindManySchema)])
      .optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    lastLoginAt: z.boolean().optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const UserSelectObjectSchema = Schema
