import { z } from 'zod'
import { VideoScalarWhereInputObjectSchema } from './VideoScalarWhereInput.schema'
import { VideoUpdateManyMutationInputObjectSchema } from './VideoUpdateManyMutationInput.schema'
import { VideoUncheckedUpdateManyWithoutVideosInputObjectSchema } from './VideoUncheckedUpdateManyWithoutVideosInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoUpdateManyWithWhereWithoutStyleInput> = z
  .object({
    where: z.lazy(() => VideoScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => VideoUpdateManyMutationInputObjectSchema),
      z.lazy(() => VideoUncheckedUpdateManyWithoutVideosInputObjectSchema),
    ]),
  })
  .strict()

export const VideoUpdateManyWithWhereWithoutStyleInputObjectSchema = Schema
