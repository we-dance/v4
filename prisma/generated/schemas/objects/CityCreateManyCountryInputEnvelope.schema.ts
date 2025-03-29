import { z } from 'zod'
import { CityCreateManyCountryInputObjectSchema } from './CityCreateManyCountryInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityCreateManyCountryInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CityCreateManyCountryInputObjectSchema),
      z.lazy(() => CityCreateManyCountryInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const CityCreateManyCountryInputEnvelopeObjectSchema = Schema
