import { z } from 'zod'
import { VideoCreateManyStyleInputObjectSchema } from './VideoCreateManyStyleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoCreateManyStyleInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => VideoCreateManyStyleInputObjectSchema),
      z.lazy(() => VideoCreateManyStyleInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const VideoCreateManyStyleInputEnvelopeObjectSchema = Schema
