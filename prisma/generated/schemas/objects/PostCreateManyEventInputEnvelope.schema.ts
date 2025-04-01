import { z } from 'zod'
import { PostCreateManyEventInputObjectSchema } from './PostCreateManyEventInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostCreateManyEventInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => PostCreateManyEventInputObjectSchema),
      z.lazy(() => PostCreateManyEventInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const PostCreateManyEventInputEnvelopeObjectSchema = Schema
