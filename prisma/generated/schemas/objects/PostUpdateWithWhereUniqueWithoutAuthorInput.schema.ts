import { z } from 'zod'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostUpdateWithoutAuthorInputObjectSchema } from './PostUpdateWithoutAuthorInput.schema'
import { PostUncheckedUpdateWithoutAuthorInputObjectSchema } from './PostUncheckedUpdateWithoutAuthorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => PostWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => PostUpdateWithoutAuthorInputObjectSchema),
      z.lazy(() => PostUncheckedUpdateWithoutAuthorInputObjectSchema),
    ]),
  })
  .strict()

export const PostUpdateWithWhereUniqueWithoutAuthorInputObjectSchema = Schema
