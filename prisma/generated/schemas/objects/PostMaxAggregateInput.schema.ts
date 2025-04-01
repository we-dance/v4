import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    title: z.literal(true).optional(),
    image: z.literal(true).optional(),
    url: z.literal(true).optional(),
    content: z.literal(true).optional(),
    type: z.literal(true).optional(),
    slug: z.literal(true).optional(),
    published: z.literal(true).optional(),
    firebaseId: z.literal(true).optional(),
    authorId: z.literal(true).optional(),
    eventId: z.literal(true).optional(),
    styleId: z.literal(true).optional(),
    upvotes: z.literal(true).optional(),
    commentsCount: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
  })
  .strict()

export const PostMaxAggregateInputObjectSchema = Schema
