import { z } from 'zod'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'
import { ProfileFindManySchema } from '../findManyProfile.schema'
import { AccountFindManySchema } from '../findManyAccount.schema'
import { SessionFindManySchema } from '../findManySession.schema'
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserInclude> = z
  .object({
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
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const UserIncludeObjectSchema = Schema
