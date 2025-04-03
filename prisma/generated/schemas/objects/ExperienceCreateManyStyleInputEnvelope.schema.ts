import { z } from 'zod'
import { ExperienceCreateManyStyleInputObjectSchema } from './ExperienceCreateManyStyleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceCreateManyStyleInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ExperienceCreateManyStyleInputObjectSchema),
      z.lazy(() => ExperienceCreateManyStyleInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const ExperienceCreateManyStyleInputEnvelopeObjectSchema = Schema
