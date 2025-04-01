import { z } from 'zod'
import { PostCreateManyStyleInputObjectSchema } from './PostCreateManyStyleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostCreateManyStyleInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => PostCreateManyStyleInputObjectSchema),
      z.lazy(() => PostCreateManyStyleInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const PostCreateManyStyleInputEnvelopeObjectSchema = Schema
