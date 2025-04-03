import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberCreateManyCityInput> = z
  .object({
    id: z.number().optional(),
    profileId: z.string(),
  })
  .strict()

export const CitySubscriberCreateManyCityInputObjectSchema = Schema
