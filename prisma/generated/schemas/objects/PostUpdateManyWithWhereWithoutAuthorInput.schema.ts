import { z } from 'zod'
import { PostScalarWhereInputObjectSchema } from './PostScalarWhereInput.schema'
import { PostUpdateManyMutationInputObjectSchema } from './PostUpdateManyMutationInput.schema'
import { PostUncheckedUpdateManyWithoutPostsInputObjectSchema } from './PostUncheckedUpdateManyWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => PostScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => PostUpdateManyMutationInputObjectSchema),
      z.lazy(() => PostUncheckedUpdateManyWithoutPostsInputObjectSchema),
    ]),
  })
  .strict()

export const PostUpdateManyWithWhereWithoutAuthorInputObjectSchema = Schema
