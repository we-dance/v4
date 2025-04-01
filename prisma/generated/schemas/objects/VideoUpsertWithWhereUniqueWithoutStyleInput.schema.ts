import { z } from 'zod'
import { VideoWhereUniqueInputObjectSchema } from './VideoWhereUniqueInput.schema'
import { VideoUpdateWithoutStyleInputObjectSchema } from './VideoUpdateWithoutStyleInput.schema'
import { VideoUncheckedUpdateWithoutStyleInputObjectSchema } from './VideoUncheckedUpdateWithoutStyleInput.schema'
import { VideoCreateWithoutStyleInputObjectSchema } from './VideoCreateWithoutStyleInput.schema'
import { VideoUncheckedCreateWithoutStyleInputObjectSchema } from './VideoUncheckedCreateWithoutStyleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoUpsertWithWhereUniqueWithoutStyleInput> = z
  .object({
    where: z.lazy(() => VideoWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => VideoUpdateWithoutStyleInputObjectSchema),
      z.lazy(() => VideoUncheckedUpdateWithoutStyleInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => VideoCreateWithoutStyleInputObjectSchema),
      z.lazy(() => VideoUncheckedCreateWithoutStyleInputObjectSchema),
    ]),
  })
  .strict()

export const VideoUpsertWithWhereUniqueWithoutStyleInputObjectSchema = Schema
