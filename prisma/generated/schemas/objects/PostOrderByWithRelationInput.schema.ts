import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { ProfileOrderByWithRelationInputObjectSchema } from './ProfileOrderByWithRelationInput.schema'
import { EventOrderByWithRelationInputObjectSchema } from './EventOrderByWithRelationInput.schema'
import { DanceStyleOrderByWithRelationInputObjectSchema } from './DanceStyleOrderByWithRelationInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
    published: z.lazy(() => SortOrderSchema).optional(),
    firebaseId: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    eventId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    styleId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    upvotes: z.lazy(() => SortOrderSchema).optional(),
    commentsCount: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    author: z
      .lazy(() => ProfileOrderByWithRelationInputObjectSchema)
      .optional(),
    event: z.lazy(() => EventOrderByWithRelationInputObjectSchema).optional(),
    style: z
      .lazy(() => DanceStyleOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict()

export const PostOrderByWithRelationInputObjectSchema = Schema
