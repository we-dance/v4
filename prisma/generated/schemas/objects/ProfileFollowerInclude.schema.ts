import { z } from 'zod'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerInclude> = z
  .object({
    follower: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    profile: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const ProfileFollowerIncludeObjectSchema = Schema
