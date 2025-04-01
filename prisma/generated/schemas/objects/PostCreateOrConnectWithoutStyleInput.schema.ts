import { z } from 'zod'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostCreateWithoutStyleInputObjectSchema } from './PostCreateWithoutStyleInput.schema'
import { PostUncheckedCreateWithoutStyleInputObjectSchema } from './PostUncheckedCreateWithoutStyleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostCreateOrConnectWithoutStyleInput> = z
  .object({
    where: z.lazy(() => PostWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => PostCreateWithoutStyleInputObjectSchema),
      z.lazy(() => PostUncheckedCreateWithoutStyleInputObjectSchema),
    ]),
  })
  .strict()

export const PostCreateOrConnectWithoutStyleInputObjectSchema = Schema
