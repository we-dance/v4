import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { CityOrderByWithRelationInputObjectSchema } from './CityOrderByWithRelationInput.schema'
import { ProfileOrderByWithRelationInputObjectSchema } from './ProfileOrderByWithRelationInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    cityId: z.lazy(() => SortOrderSchema).optional(),
    profileId: z.lazy(() => SortOrderSchema).optional(),
    city: z.lazy(() => CityOrderByWithRelationInputObjectSchema).optional(),
    profile: z
      .lazy(() => ProfileOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict()

export const CitySubscriberOrderByWithRelationInputObjectSchema = Schema
