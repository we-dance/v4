import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z
  .object({
    profilesCreated: z.boolean().optional(),
    accounts: z.boolean().optional(),
    sessions: z.boolean().optional(),
  })
  .strict()

export const UserCountOutputTypeSelectObjectSchema = Schema
