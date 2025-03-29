import { z } from 'zod'
import { PostCreateWithoutAuthorInputObjectSchema } from './PostCreateWithoutAuthorInput.schema'
import { PostUncheckedCreateWithoutAuthorInputObjectSchema } from './PostUncheckedCreateWithoutAuthorInput.schema'
import { PostCreateOrConnectWithoutAuthorInputObjectSchema } from './PostCreateOrConnectWithoutAuthorInput.schema'
import { PostUpsertWithWhereUniqueWithoutAuthorInputObjectSchema } from './PostUpsertWithWhereUniqueWithoutAuthorInput.schema'
import { PostCreateManyAuthorInputEnvelopeObjectSchema } from './PostCreateManyAuthorInputEnvelope.schema'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostUpdateWithWhereUniqueWithoutAuthorInputObjectSchema } from './PostUpdateWithWhereUniqueWithoutAuthorInput.schema'
import { PostUpdateManyWithWhereWithoutAuthorInputObjectSchema } from './PostUpdateManyWithWhereWithoutAuthorInput.schema'
import { PostScalarWhereInputObjectSchema } from './PostScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUpdateManyWithoutAuthorNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => PostCreateWithoutAuthorInputObjectSchema),
        z.lazy(() => PostCreateWithoutAuthorInputObjectSchema).array(),
        z.lazy(() => PostUncheckedCreateWithoutAuthorInputObjectSchema),
        z.lazy(() => PostUncheckedCreateWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostCreateOrConnectWithoutAuthorInputObjectSchema),
        z.lazy(() => PostCreateOrConnectWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputObjectSchema),
        z
          .lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PostCreateManyAuthorInputEnvelopeObjectSchema)
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
        z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputObjectSchema),
        z
          .lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputObjectSchema),
        z
          .lazy(() => PostUpdateManyWithWhereWithoutAuthorInputObjectSchema)
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

export const PostUpdateManyWithoutAuthorNestedInputObjectSchema = Schema
