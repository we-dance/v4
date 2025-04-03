import { z } from 'zod'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerSelect> = z
  .object({
    id: z.boolean().optional(),
    followerId: z.boolean().optional(),
    follower: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    profileId: z.boolean().optional(),
    profile: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    createdAt: z.boolean().optional(),
  })
  .strict()

export const ProfileFollowerSelectObjectSchema = Schema
