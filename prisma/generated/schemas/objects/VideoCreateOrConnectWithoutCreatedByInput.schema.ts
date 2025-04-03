import { z } from 'zod'
import { VideoWhereUniqueInputObjectSchema } from './VideoWhereUniqueInput.schema'
import { VideoCreateWithoutCreatedByInputObjectSchema } from './VideoCreateWithoutCreatedByInput.schema'
import { VideoUncheckedCreateWithoutCreatedByInputObjectSchema } from './VideoUncheckedCreateWithoutCreatedByInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoCreateOrConnectWithoutCreatedByInput> = z
  .object({
    where: z.lazy(() => VideoWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => VideoCreateWithoutCreatedByInputObjectSchema),
      z.lazy(() => VideoUncheckedCreateWithoutCreatedByInputObjectSchema),
    ]),
  })
  .strict()

export const VideoCreateOrConnectWithoutCreatedByInputObjectSchema = Schema
