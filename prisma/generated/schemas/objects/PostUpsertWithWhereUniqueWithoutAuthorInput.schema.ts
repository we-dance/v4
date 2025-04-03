import { z } from 'zod'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostUpdateWithoutAuthorInputObjectSchema } from './PostUpdateWithoutAuthorInput.schema'
import { PostUncheckedUpdateWithoutAuthorInputObjectSchema } from './PostUncheckedUpdateWithoutAuthorInput.schema'
import { PostCreateWithoutAuthorInputObjectSchema } from './PostCreateWithoutAuthorInput.schema'
import { PostUncheckedCreateWithoutAuthorInputObjectSchema } from './PostUncheckedCreateWithoutAuthorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => PostWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => PostUpdateWithoutAuthorInputObjectSchema),
      z.lazy(() => PostUncheckedUpdateWithoutAuthorInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => PostCreateWithoutAuthorInputObjectSchema),
      z.lazy(() => PostUncheckedCreateWithoutAuthorInputObjectSchema),
    ]),
  })
  .strict()

export const PostUpsertWithWhereUniqueWithoutAuthorInputObjectSchema = Schema
