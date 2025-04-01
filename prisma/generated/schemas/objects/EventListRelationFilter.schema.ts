import { z } from 'zod'
import { EventWhereInputObjectSchema } from './EventWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventListRelationFilter> = z
  .object({
    every: z.lazy(() => EventWhereInputObjectSchema).optional(),
    some: z.lazy(() => EventWhereInputObjectSchema).optional(),
    none: z.lazy(() => EventWhereInputObjectSchema).optional(),
  })
  .strict()

export const EventListRelationFilterObjectSchema = Schema
