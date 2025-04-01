import { z } from 'zod'
import { VideoScalarWhereInputObjectSchema } from './VideoScalarWhereInput.schema'
import { VideoUpdateManyMutationInputObjectSchema } from './VideoUpdateManyMutationInput.schema'
import { VideoUncheckedUpdateManyWithoutVideosAddedInputObjectSchema } from './VideoUncheckedUpdateManyWithoutVideosAddedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoUpdateManyWithWhereWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => VideoScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => VideoUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => VideoUncheckedUpdateManyWithoutVideosAddedInputObjectSchema
        ),
      ]),
    })
    .strict()

export const VideoUpdateManyWithWhereWithoutCreatedByInputObjectSchema = Schema
