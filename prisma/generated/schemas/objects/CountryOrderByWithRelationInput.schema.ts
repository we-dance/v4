import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { CityOrderByRelationAggregateInputObjectSchema } from './CityOrderByRelationAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryOrderByWithRelationInput> = z
  .object({
    code: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    cities: z
      .lazy(() => CityOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict()

export const CountryOrderByWithRelationInputObjectSchema = Schema
