import { z } from 'zod'
import { GuestWhereInputObjectSchema } from './GuestWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestListRelationFilter> = z
  .object({
    every: z.lazy(() => GuestWhereInputObjectSchema).optional(),
    some: z.lazy(() => GuestWhereInputObjectSchema).optional(),
    none: z.lazy(() => GuestWhereInputObjectSchema).optional(),
  })
  .strict()

export const GuestListRelationFilterObjectSchema = Schema
