import { z } from 'zod'
import { PostCreateWithoutEventInputObjectSchema } from './PostCreateWithoutEventInput.schema'
import { PostUncheckedCreateWithoutEventInputObjectSchema } from './PostUncheckedCreateWithoutEventInput.schema'
import { PostCreateOrConnectWithoutEventInputObjectSchema } from './PostCreateOrConnectWithoutEventInput.schema'
import { PostUpsertWithWhereUniqueWithoutEventInputObjectSchema } from './PostUpsertWithWhereUniqueWithoutEventInput.schema'
import { PostCreateManyEventInputEnvelopeObjectSchema } from './PostCreateManyEventInputEnvelope.schema'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostUpdateWithWhereUniqueWithoutEventInputObjectSchema } from './PostUpdateWithWhereUniqueWithoutEventInput.schema'
import { PostUpdateManyWithWhereWithoutEventInputObjectSchema } from './PostUpdateManyWithWhereWithoutEventInput.schema'
import { PostScalarWhereInputObjectSchema } from './PostScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutEventNestedInput> =
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
      upsert: z
        .union([
          z.lazy(() => PostUpsertWithWhereUniqueWithoutEventInputObjectSchema),
          z
            .lazy(() => PostUpsertWithWhereUniqueWithoutEventInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyEventInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PostWhereUniqueInputObjectSchema),
          z.lazy(() => PostWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PostWhereUniqueInputObjectSchema),
          z.lazy(() => PostWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PostWhereUniqueInputObjectSchema),
          z.lazy(() => PostWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputObjectSchema),
          z.lazy(() => PostWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PostUpdateWithWhereUniqueWithoutEventInputObjectSchema),
          z
            .lazy(() => PostUpdateWithWhereUniqueWithoutEventInputObjectSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PostUpdateManyWithWhereWithoutEventInputObjectSchema),
          z
            .lazy(() => PostUpdateManyWithWhereWithoutEventInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PostScalarWhereInputObjectSchema),
          z.lazy(() => PostScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const PostUncheckedUpdateManyWithoutEventNestedInputObjectSchema = Schema
