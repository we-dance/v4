import { z } from 'zod'
import { VideoWhereUniqueInputObjectSchema } from './VideoWhereUniqueInput.schema'
import { VideoUpdateWithoutStyleInputObjectSchema } from './VideoUpdateWithoutStyleInput.schema'
import { VideoUncheckedUpdateWithoutStyleInputObjectSchema } from './VideoUncheckedUpdateWithoutStyleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoUpdateWithWhereUniqueWithoutStyleInput> = z
  .object({
    where: z.lazy(() => VideoWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => VideoUpdateWithoutStyleInputObjectSchema),
      z.lazy(() => VideoUncheckedUpdateWithoutStyleInputObjectSchema),
    ]),
  })
  .strict()

export const VideoUpdateWithWhereUniqueWithoutStyleInputObjectSchema = Schema
