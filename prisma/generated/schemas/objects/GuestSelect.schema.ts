import { z } from 'zod'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'
import { EventArgsObjectSchema } from './EventArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestSelect> = z
  .object({
    id: z.boolean().optional(),
    profileId: z.boolean().optional(),
    profile: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    eventId: z.boolean().optional(),
    event: z
      .union([z.boolean(), z.lazy(() => EventArgsObjectSchema)])
      .optional(),
    role: z.boolean().optional(),
    status: z.boolean().optional(),
    invitedAt: z.boolean().optional(),
    confirmedAt: z.boolean().optional(),
    cancelledAt: z.boolean().optional(),
    registeredAt: z.boolean().optional(),
    waitlistedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict()

export const GuestSelectObjectSchema = Schema
