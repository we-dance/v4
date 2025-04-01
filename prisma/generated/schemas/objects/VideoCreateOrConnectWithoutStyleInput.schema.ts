import { z } from 'zod'
import { VideoWhereUniqueInputObjectSchema } from './VideoWhereUniqueInput.schema'
import { VideoCreateWithoutStyleInputObjectSchema } from './VideoCreateWithoutStyleInput.schema'
import { VideoUncheckedCreateWithoutStyleInputObjectSchema } from './VideoUncheckedCreateWithoutStyleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoCreateOrConnectWithoutStyleInput> = z
  .object({
    where: z.lazy(() => VideoWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => VideoCreateWithoutStyleInputObjectSchema),
      z.lazy(() => VideoUncheckedCreateWithoutStyleInputObjectSchema),
    ]),
  })
  .strict()

export const VideoCreateOrConnectWithoutStyleInputObjectSchema = Schema
