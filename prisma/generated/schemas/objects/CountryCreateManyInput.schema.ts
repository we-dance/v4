import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryCreateManyInput> = z
  .object({
    code: z.string(),
    name: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict()

export const CountryCreateManyInputObjectSchema = Schema
