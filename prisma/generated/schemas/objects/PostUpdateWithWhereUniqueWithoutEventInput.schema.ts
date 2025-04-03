import { z } from 'zod'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostUpdateWithoutEventInputObjectSchema } from './PostUpdateWithoutEventInput.schema'
import { PostUncheckedUpdateWithoutEventInputObjectSchema } from './PostUncheckedUpdateWithoutEventInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutEventInput> = z
  .object({
    where: z.lazy(() => PostWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => PostUpdateWithoutEventInputObjectSchema),
      z.lazy(() => PostUncheckedUpdateWithoutEventInputObjectSchema),
    ]),
  })
  .strict()

export const PostUpdateWithWhereUniqueWithoutEventInputObjectSchema = Schema
