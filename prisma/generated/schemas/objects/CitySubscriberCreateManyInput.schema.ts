import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberCreateManyInput> = z
  .object({
    id: z.number().optional(),
    cityId: z.string(),
    profileId: z.string(),
  })
  .strict()

export const CitySubscriberCreateManyInputObjectSchema = Schema
