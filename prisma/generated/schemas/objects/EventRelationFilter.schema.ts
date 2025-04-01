import { z } from 'zod'
import { EventWhereInputObjectSchema } from './EventWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventRelationFilter> = z
  .object({
    is: z
      .lazy(() => EventWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => EventWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict()

export const EventRelationFilterObjectSchema = Schema
