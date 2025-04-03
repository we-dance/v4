import { z } from 'zod'
import { VideoCreateWithoutStyleInputObjectSchema } from './VideoCreateWithoutStyleInput.schema'
import { VideoUncheckedCreateWithoutStyleInputObjectSchema } from './VideoUncheckedCreateWithoutStyleInput.schema'
import { VideoCreateOrConnectWithoutStyleInputObjectSchema } from './VideoCreateOrConnectWithoutStyleInput.schema'
import { VideoCreateManyStyleInputEnvelopeObjectSchema } from './VideoCreateManyStyleInputEnvelope.schema'
import { VideoWhereUniqueInputObjectSchema } from './VideoWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoUncheckedCreateNestedManyWithoutStyleInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VideoCreateWithoutStyleInputObjectSchema),
          z.lazy(() => VideoCreateWithoutStyleInputObjectSchema).array(),
          z.lazy(() => VideoUncheckedCreateWithoutStyleInputObjectSchema),
          z
            .lazy(() => VideoUncheckedCreateWithoutStyleInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => VideoCreateOrConnectWithoutStyleInputObjectSchema),
          z
            .lazy(() => VideoCreateOrConnectWithoutStyleInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => VideoCreateManyStyleInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => VideoWhereUniqueInputObjectSchema),
          z.lazy(() => VideoWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const VideoUncheckedCreateNestedManyWithoutStyleInputObjectSchema =
  Schema
