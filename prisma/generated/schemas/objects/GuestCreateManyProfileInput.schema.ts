import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestCreateManyProfileInput> = z
  .object({
    id: z.string().optional(),
    eventId: z.string(),
    role: z.string(),
    status: z.string(),
    invitedAt: z.coerce.date().optional().nullable(),
    confirmedAt: z.coerce.date().optional().nullable(),
    cancelledAt: z.coerce.date().optional().nullable(),
    registeredAt: z.coerce.date().optional().nullable(),
    waitlistedAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict()

export const GuestCreateManyProfileInputObjectSchema = Schema
