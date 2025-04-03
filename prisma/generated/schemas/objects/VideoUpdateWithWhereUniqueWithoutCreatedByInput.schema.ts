import { z } from 'zod'
import { VideoWhereUniqueInputObjectSchema } from './VideoWhereUniqueInput.schema'
import { VideoUpdateWithoutCreatedByInputObjectSchema } from './VideoUpdateWithoutCreatedByInput.schema'
import { VideoUncheckedUpdateWithoutCreatedByInputObjectSchema } from './VideoUncheckedUpdateWithoutCreatedByInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoUpdateWithWhereUniqueWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => VideoWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => VideoUpdateWithoutCreatedByInputObjectSchema),
        z.lazy(() => VideoUncheckedUpdateWithoutCreatedByInputObjectSchema),
      ]),
    })
    .strict()

export const VideoUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema =
  Schema
