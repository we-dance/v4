import { z } from 'zod'
import { GuestSelectObjectSchema } from './GuestSelect.schema'
import { GuestIncludeObjectSchema } from './GuestInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestArgs> = z
  .object({
    select: z.lazy(() => GuestSelectObjectSchema).optional(),
    include: z.lazy(() => GuestIncludeObjectSchema).optional(),
  })
  .strict()

export const GuestArgsObjectSchema = Schema
