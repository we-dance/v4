import { z } from 'zod'
import { EventCreateNestedOneWithoutPostsInputObjectSchema } from './EventCreateNestedOneWithoutPostsInput.schema'
import { DanceStyleCreateNestedOneWithoutPostsInputObjectSchema } from './DanceStyleCreateNestedOneWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> = z
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
    upvotes: z.number().optional(),
    commentsCount: z.number().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    event: z
      .lazy(() => EventCreateNestedOneWithoutPostsInputObjectSchema)
      .optional(),
    style: z
      .lazy(() => DanceStyleCreateNestedOneWithoutPostsInputObjectSchema)
      .optional(),
  })
  .strict()

export const PostCreateWithoutAuthorInputObjectSchema = Schema
