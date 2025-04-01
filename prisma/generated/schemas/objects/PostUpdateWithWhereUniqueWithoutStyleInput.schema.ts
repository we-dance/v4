import { z } from 'zod'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostUpdateWithoutStyleInputObjectSchema } from './PostUpdateWithoutStyleInput.schema'
import { PostUncheckedUpdateWithoutStyleInputObjectSchema } from './PostUncheckedUpdateWithoutStyleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutStyleInput> = z
  .object({
    where: z.lazy(() => PostWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => PostUpdateWithoutStyleInputObjectSchema),
      z.lazy(() => PostUncheckedUpdateWithoutStyleInputObjectSchema),
    ]),
  })
  .strict()

export const PostUpdateWithWhereUniqueWithoutStyleInputObjectSchema = Schema
