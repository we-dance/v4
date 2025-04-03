import { z } from 'zod'
import { VideoCreateWithoutCreatedByInputObjectSchema } from './VideoCreateWithoutCreatedByInput.schema'
import { VideoUncheckedCreateWithoutCreatedByInputObjectSchema } from './VideoUncheckedCreateWithoutCreatedByInput.schema'
import { VideoCreateOrConnectWithoutCreatedByInputObjectSchema } from './VideoCreateOrConnectWithoutCreatedByInput.schema'
import { VideoUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema } from './VideoUpsertWithWhereUniqueWithoutCreatedByInput.schema'
import { VideoCreateManyCreatedByInputEnvelopeObjectSchema } from './VideoCreateManyCreatedByInputEnvelope.schema'
import { VideoWhereUniqueInputObjectSchema } from './VideoWhereUniqueInput.schema'
import { VideoUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema } from './VideoUpdateWithWhereUniqueWithoutCreatedByInput.schema'
import { VideoUpdateManyWithWhereWithoutCreatedByInputObjectSchema } from './VideoUpdateManyWithWhereWithoutCreatedByInput.schema'
import { VideoScalarWhereInputObjectSchema } from './VideoScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoUpdateManyWithoutCreatedByNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => VideoCreateWithoutCreatedByInputObjectSchema),
        z.lazy(() => VideoCreateWithoutCreatedByInputObjectSchema).array(),
        z.lazy(() => VideoUncheckedCreateWithoutCreatedByInputObjectSchema),
        z
          .lazy(() => VideoUncheckedCreateWithoutCreatedByInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => VideoCreateOrConnectWithoutCreatedByInputObjectSchema),
        z
          .lazy(() => VideoCreateOrConnectWithoutCreatedByInputObjectSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => VideoUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema
        ),
        z
          .lazy(
            () => VideoUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VideoCreateManyCreatedByInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => VideoWhereUniqueInputObjectSchema),
        z.lazy(() => VideoWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => VideoWhereUniqueInputObjectSchema),
        z.lazy(() => VideoWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => VideoWhereUniqueInputObjectSchema),
        z.lazy(() => VideoWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => VideoWhereUniqueInputObjectSchema),
        z.lazy(() => VideoWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => VideoUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema
        ),
        z
          .lazy(
            () => VideoUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => VideoUpdateManyWithWhereWithoutCreatedByInputObjectSchema),
        z
          .lazy(() => VideoUpdateManyWithWhereWithoutCreatedByInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => VideoScalarWhereInputObjectSchema),
        z.lazy(() => VideoScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const VideoUpdateManyWithoutCreatedByNestedInputObjectSchema = Schema
