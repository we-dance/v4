import { z } from 'zod'
import { PostCreateWithoutEventInputObjectSchema } from './PostCreateWithoutEventInput.schema'
import { PostUncheckedCreateWithoutEventInputObjectSchema } from './PostUncheckedCreateWithoutEventInput.schema'
import { PostCreateOrConnectWithoutEventInputObjectSchema } from './PostCreateOrConnectWithoutEventInput.schema'
import { PostCreateManyEventInputEnvelopeObjectSchema } from './PostCreateManyEventInputEnvelope.schema'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutEventInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutEventInputObjectSchema),
          z.lazy(() => PostCreateWithoutEventInputObjectSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutEventInputObjectSchema),
          z
            .lazy(() => PostUncheckedCreateWithoutEventInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutEventInputObjectSchema),
          z
            .lazy(() => PostCreateOrConnectWithoutEventInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyEventInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputObjectSchema),
          z.lazy(() => PostWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const PostUncheckedCreateNestedManyWithoutEventInputObjectSchema = Schema
