import { z } from 'zod'
import { GuestProfileIdEventIdCompoundUniqueInputObjectSchema } from './GuestProfileIdEventIdCompoundUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestWhereUniqueInput> = z
  .object({
    id: z.string().optional(),
    profileId_eventId: z
      .lazy(() => GuestProfileIdEventIdCompoundUniqueInputObjectSchema)
      .optional(),
  })
  .strict()

export const GuestWhereUniqueInputObjectSchema = Schema
