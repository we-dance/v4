import { z } from 'zod'
import { ProfileCreateNestedOneWithoutVideosAddedInputObjectSchema } from './ProfileCreateNestedOneWithoutVideosAddedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoCreateWithoutStyleInput> = z
  .object({
    id: z.string().optional(),
    url: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    createdBy: z
      .lazy(() => ProfileCreateNestedOneWithoutVideosAddedInputObjectSchema)
      .optional(),
  })
  .strict()

export const VideoCreateWithoutStyleInputObjectSchema = Schema
