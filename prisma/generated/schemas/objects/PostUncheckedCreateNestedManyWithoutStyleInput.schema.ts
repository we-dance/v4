import { z } from 'zod'
import { PostCreateWithoutStyleInputObjectSchema } from './PostCreateWithoutStyleInput.schema'
import { PostUncheckedCreateWithoutStyleInputObjectSchema } from './PostUncheckedCreateWithoutStyleInput.schema'
import { PostCreateOrConnectWithoutStyleInputObjectSchema } from './PostCreateOrConnectWithoutStyleInput.schema'
import { PostCreateManyStyleInputEnvelopeObjectSchema } from './PostCreateManyStyleInputEnvelope.schema'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutStyleInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutStyleInputObjectSchema),
          z.lazy(() => PostCreateWithoutStyleInputObjectSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutStyleInputObjectSchema),
          z
            .lazy(() => PostUncheckedCreateWithoutStyleInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutStyleInputObjectSchema),
          z
            .lazy(() => PostCreateOrConnectWithoutStyleInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyStyleInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputObjectSchema),
          z.lazy(() => PostWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const PostUncheckedCreateNestedManyWithoutStyleInputObjectSchema = Schema
