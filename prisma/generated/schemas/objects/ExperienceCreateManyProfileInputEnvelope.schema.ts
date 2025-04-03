import { z } from 'zod'
import { ExperienceCreateManyProfileInputObjectSchema } from './ExperienceCreateManyProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceCreateManyProfileInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ExperienceCreateManyProfileInputObjectSchema),
      z.lazy(() => ExperienceCreateManyProfileInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const ExperienceCreateManyProfileInputEnvelopeObjectSchema = Schema
