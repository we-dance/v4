import { z } from 'zod'
import { DanceStyleCreateNestedOneWithoutVideosInputObjectSchema } from './DanceStyleCreateNestedOneWithoutVideosInput.schema'
import { ProfileCreateNestedOneWithoutVideosAddedInputObjectSchema } from './ProfileCreateNestedOneWithoutVideosAddedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoCreateInput> = z
  .object({
    id: z.string().optional(),
    url: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    style: z.lazy(
      () => DanceStyleCreateNestedOneWithoutVideosInputObjectSchema
    ),
    createdBy: z
      .lazy(() => ProfileCreateNestedOneWithoutVideosAddedInputObjectSchema)
      .optional(),
  })
  .strict()

export const VideoCreateInputObjectSchema = Schema
