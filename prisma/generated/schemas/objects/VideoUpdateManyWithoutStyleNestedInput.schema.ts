import { z } from 'zod'
import { VideoCreateWithoutStyleInputObjectSchema } from './VideoCreateWithoutStyleInput.schema'
import { VideoUncheckedCreateWithoutStyleInputObjectSchema } from './VideoUncheckedCreateWithoutStyleInput.schema'
import { VideoCreateOrConnectWithoutStyleInputObjectSchema } from './VideoCreateOrConnectWithoutStyleInput.schema'
import { VideoUpsertWithWhereUniqueWithoutStyleInputObjectSchema } from './VideoUpsertWithWhereUniqueWithoutStyleInput.schema'
import { VideoCreateManyStyleInputEnvelopeObjectSchema } from './VideoCreateManyStyleInputEnvelope.schema'
import { VideoWhereUniqueInputObjectSchema } from './VideoWhereUniqueInput.schema'
import { VideoUpdateWithWhereUniqueWithoutStyleInputObjectSchema } from './VideoUpdateWithWhereUniqueWithoutStyleInput.schema'
import { VideoUpdateManyWithWhereWithoutStyleInputObjectSchema } from './VideoUpdateManyWithWhereWithoutStyleInput.schema'
import { VideoScalarWhereInputObjectSchema } from './VideoScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoUpdateManyWithoutStyleNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => VideoCreateWithoutStyleInputObjectSchema),
        z.lazy(() => VideoCreateWithoutStyleInputObjectSchema).array(),
        z.lazy(() => VideoUncheckedCreateWithoutStyleInputObjectSchema),
        z.lazy(() => VideoUncheckedCreateWithoutStyleInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => VideoCreateOrConnectWithoutStyleInputObjectSchema),
        z.lazy(() => VideoCreateOrConnectWithoutStyleInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => VideoUpsertWithWhereUniqueWithoutStyleInputObjectSchema),
        z
          .lazy(() => VideoUpsertWithWhereUniqueWithoutStyleInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VideoCreateManyStyleInputEnvelopeObjectSchema)
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
        z.lazy(() => VideoUpdateWithWhereUniqueWithoutStyleInputObjectSchema),
        z
          .lazy(() => VideoUpdateWithWhereUniqueWithoutStyleInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => VideoUpdateManyWithWhereWithoutStyleInputObjectSchema),
        z
          .lazy(() => VideoUpdateManyWithWhereWithoutStyleInputObjectSchema)
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

export const VideoUpdateManyWithoutStyleNestedInputObjectSchema = Schema
