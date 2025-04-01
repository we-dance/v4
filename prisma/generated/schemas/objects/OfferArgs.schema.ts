import { z } from 'zod'
import { OfferSelectObjectSchema } from './OfferSelect.schema'
import { OfferIncludeObjectSchema } from './OfferInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferArgs> = z
  .object({
    select: z.lazy(() => OfferSelectObjectSchema).optional(),
    include: z.lazy(() => OfferIncludeObjectSchema).optional(),
  })
  .strict()

export const OfferArgsObjectSchema = Schema
