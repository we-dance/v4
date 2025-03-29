import { z } from 'zod'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostUpdateWithoutStyleInputObjectSchema } from './PostUpdateWithoutStyleInput.schema'
import { PostUncheckedUpdateWithoutStyleInputObjectSchema } from './PostUncheckedUpdateWithoutStyleInput.schema'
import { PostCreateWithoutStyleInputObjectSchema } from './PostCreateWithoutStyleInput.schema'
import { PostUncheckedCreateWithoutStyleInputObjectSchema } from './PostUncheckedCreateWithoutStyleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutStyleInput> = z
  .object({
    where: z.lazy(() => PostWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => PostUpdateWithoutStyleInputObjectSchema),
      z.lazy(() => PostUncheckedUpdateWithoutStyleInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => PostCreateWithoutStyleInputObjectSchema),
      z.lazy(() => PostUncheckedCreateWithoutStyleInputObjectSchema),
    ]),
  })
  .strict()

export const PostUpsertWithWhereUniqueWithoutStyleInputObjectSchema = Schema
