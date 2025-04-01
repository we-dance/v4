import { z } from 'zod'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostCreateWithoutEventInputObjectSchema } from './PostCreateWithoutEventInput.schema'
import { PostUncheckedCreateWithoutEventInputObjectSchema } from './PostUncheckedCreateWithoutEventInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostCreateOrConnectWithoutEventInput> = z
  .object({
    where: z.lazy(() => PostWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => PostCreateWithoutEventInputObjectSchema),
      z.lazy(() => PostUncheckedCreateWithoutEventInputObjectSchema),
    ]),
  })
  .strict()

export const PostCreateOrConnectWithoutEventInputObjectSchema = Schema
