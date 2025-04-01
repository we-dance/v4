import { z } from 'zod'
import { VideoCreateWithoutCreatedByInputObjectSchema } from './VideoCreateWithoutCreatedByInput.schema'
import { VideoUncheckedCreateWithoutCreatedByInputObjectSchema } from './VideoUncheckedCreateWithoutCreatedByInput.schema'
import { VideoCreateOrConnectWithoutCreatedByInputObjectSchema } from './VideoCreateOrConnectWithoutCreatedByInput.schema'
import { VideoCreateManyCreatedByInputEnvelopeObjectSchema } from './VideoCreateManyCreatedByInputEnvelope.schema'
import { VideoWhereUniqueInputObjectSchema } from './VideoWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoUncheckedCreateNestedManyWithoutCreatedByInput> =
  z
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
      createMany: z
        .lazy(() => VideoCreateManyCreatedByInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => VideoWhereUniqueInputObjectSchema),
          z.lazy(() => VideoWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const VideoUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema =
  Schema
