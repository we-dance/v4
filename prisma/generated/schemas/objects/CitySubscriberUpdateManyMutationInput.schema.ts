import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberUpdateManyMutationInput> = z
  .object({})
  .strict()

export const CitySubscriberUpdateManyMutationInputObjectSchema = Schema
