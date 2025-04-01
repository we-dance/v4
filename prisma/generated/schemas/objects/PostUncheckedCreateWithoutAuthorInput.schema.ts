import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> = z
  .object({
    id: z.string().optional(),
    title: z.string().optional(),
    image: z.string().optional(),
    url: z.string().optional(),
    content: z.string().optional(),
    type: z.string().optional(),
    slug: z.string(),
    published: z.boolean().optional(),
    firebaseId: z.string().optional(),
    eventId: z.string().optional().nullable(),
    styleId: z.number().optional().nullable(),
    upvotes: z.number().optional(),
    commentsCount: z.number().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict()

export const PostUncheckedCreateWithoutAuthorInputObjectSchema = Schema
