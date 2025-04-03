import { z } from 'zod'
import { PostCreateWithoutStyleInputObjectSchema } from './PostCreateWithoutStyleInput.schema'
import { PostUncheckedCreateWithoutStyleInputObjectSchema } from './PostUncheckedCreateWithoutStyleInput.schema'
import { PostCreateOrConnectWithoutStyleInputObjectSchema } from './PostCreateOrConnectWithoutStyleInput.schema'
import { PostUpsertWithWhereUniqueWithoutStyleInputObjectSchema } from './PostUpsertWithWhereUniqueWithoutStyleInput.schema'
import { PostCreateManyStyleInputEnvelopeObjectSchema } from './PostCreateManyStyleInputEnvelope.schema'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostUpdateWithWhereUniqueWithoutStyleInputObjectSchema } from './PostUpdateWithWhereUniqueWithoutStyleInput.schema'
import { PostUpdateManyWithWhereWithoutStyleInputObjectSchema } from './PostUpdateManyWithWhereWithoutStyleInput.schema'
import { PostScalarWhereInputObjectSchema } from './PostScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUpdateManyWithoutStyleNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => PostCreateWithoutStyleInputObjectSchema),
        z.lazy(() => PostCreateWithoutStyleInputObjectSchema).array(),
        z.lazy(() => PostUncheckedCreateWithoutStyleInputObjectSchema),
        z.lazy(() => PostUncheckedCreateWithoutStyleInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostCreateOrConnectWithoutStyleInputObjectSchema),
        z.lazy(() => PostCreateOrConnectWithoutStyleInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => PostUpsertWithWhereUniqueWithoutStyleInputObjectSchema),
        z
          .lazy(() => PostUpsertWithWhereUniqueWithoutStyleInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PostCreateManyStyleInputEnvelopeObjectSchema)
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
        z.lazy(() => PostUpdateWithWhereUniqueWithoutStyleInputObjectSchema),
        z
          .lazy(() => PostUpdateWithWhereUniqueWithoutStyleInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => PostUpdateManyWithWhereWithoutStyleInputObjectSchema),
        z
          .lazy(() => PostUpdateManyWithWhereWithoutStyleInputObjectSchema)
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

export const PostUpdateManyWithoutStyleNestedInputObjectSchema = Schema
