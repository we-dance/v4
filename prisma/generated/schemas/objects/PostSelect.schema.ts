import { z } from 'zod'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'
import { EventArgsObjectSchema } from './EventArgs.schema'
import { DanceStyleArgsObjectSchema } from './DanceStyleArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostSelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    image: z.boolean().optional(),
    url: z.boolean().optional(),
    content: z.boolean().optional(),
    type: z.boolean().optional(),
    slug: z.boolean().optional(),
    published: z.boolean().optional(),
    firebaseId: z.boolean().optional(),
    author: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    authorId: z.boolean().optional(),
    event: z
      .union([z.boolean(), z.lazy(() => EventArgsObjectSchema)])
      .optional(),
    eventId: z.boolean().optional(),
    styleId: z.boolean().optional(),
    style: z
      .union([z.boolean(), z.lazy(() => DanceStyleArgsObjectSchema)])
      .optional(),
    upvotes: z.boolean().optional(),
    commentsCount: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict()

export const PostSelectObjectSchema = Schema
