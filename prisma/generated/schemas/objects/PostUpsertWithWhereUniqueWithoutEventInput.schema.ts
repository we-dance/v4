import { z } from 'zod'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostUpdateWithoutEventInputObjectSchema } from './PostUpdateWithoutEventInput.schema'
import { PostUncheckedUpdateWithoutEventInputObjectSchema } from './PostUncheckedUpdateWithoutEventInput.schema'
import { PostCreateWithoutEventInputObjectSchema } from './PostCreateWithoutEventInput.schema'
import { PostUncheckedCreateWithoutEventInputObjectSchema } from './PostUncheckedCreateWithoutEventInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutEventInput> = z
  .object({
    where: z.lazy(() => PostWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => PostUpdateWithoutEventInputObjectSchema),
      z.lazy(() => PostUncheckedUpdateWithoutEventInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => PostCreateWithoutEventInputObjectSchema),
      z.lazy(() => PostUncheckedCreateWithoutEventInputObjectSchema),
    ]),
  })
  .strict()

export const PostUpsertWithWhereUniqueWithoutEventInputObjectSchema = Schema
