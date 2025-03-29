import { z } from 'zod'
import { DanceStyleWhereInputObjectSchema } from './DanceStyleWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleRelationFilter> = z
  .object({
    is: z
      .lazy(() => DanceStyleWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => DanceStyleWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict()

export const DanceStyleRelationFilterObjectSchema = Schema
