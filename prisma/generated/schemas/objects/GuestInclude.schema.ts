import { z } from 'zod'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'
import { EventArgsObjectSchema } from './EventArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestInclude> = z
  .object({
    profile: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    event: z
      .union([z.boolean(), z.lazy(() => EventArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const GuestIncludeObjectSchema = Schema
