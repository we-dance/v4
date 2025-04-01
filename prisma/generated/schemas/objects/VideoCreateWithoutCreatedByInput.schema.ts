import { z } from 'zod'
import { DanceStyleCreateNestedOneWithoutVideosInputObjectSchema } from './DanceStyleCreateNestedOneWithoutVideosInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoCreateWithoutCreatedByInput> = z
  .object({
    id: z.string().optional(),
    url: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    style: z.lazy(
      () => DanceStyleCreateNestedOneWithoutVideosInputObjectSchema
    ),
  })
  .strict()

export const VideoCreateWithoutCreatedByInputObjectSchema = Schema
