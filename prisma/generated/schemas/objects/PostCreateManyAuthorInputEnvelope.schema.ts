import { z } from 'zod'
import { PostCreateManyAuthorInputObjectSchema } from './PostCreateManyAuthorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostCreateManyAuthorInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => PostCreateManyAuthorInputObjectSchema),
      z.lazy(() => PostCreateManyAuthorInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const PostCreateManyAuthorInputEnvelopeObjectSchema = Schema
