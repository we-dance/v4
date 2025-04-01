import { z } from 'zod'
import { VideoCreateManyCreatedByInputObjectSchema } from './VideoCreateManyCreatedByInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoCreateManyCreatedByInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => VideoCreateManyCreatedByInputObjectSchema),
      z.lazy(() => VideoCreateManyCreatedByInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const VideoCreateManyCreatedByInputEnvelopeObjectSchema = Schema
