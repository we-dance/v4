import { z } from 'zod'
import { VideoWhereUniqueInputObjectSchema } from './VideoWhereUniqueInput.schema'
import { VideoUpdateWithoutCreatedByInputObjectSchema } from './VideoUpdateWithoutCreatedByInput.schema'
import { VideoUncheckedUpdateWithoutCreatedByInputObjectSchema } from './VideoUncheckedUpdateWithoutCreatedByInput.schema'
import { VideoCreateWithoutCreatedByInputObjectSchema } from './VideoCreateWithoutCreatedByInput.schema'
import { VideoUncheckedCreateWithoutCreatedByInputObjectSchema } from './VideoUncheckedCreateWithoutCreatedByInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoUpsertWithWhereUniqueWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => VideoWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => VideoUpdateWithoutCreatedByInputObjectSchema),
        z.lazy(() => VideoUncheckedUpdateWithoutCreatedByInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => VideoCreateWithoutCreatedByInputObjectSchema),
        z.lazy(() => VideoUncheckedCreateWithoutCreatedByInputObjectSchema),
      ]),
    })
    .strict()

export const VideoUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema =
  Schema
