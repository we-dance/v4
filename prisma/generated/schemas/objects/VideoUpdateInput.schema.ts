import { z } from 'zod'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { DanceStyleUpdateOneRequiredWithoutVideosNestedInputObjectSchema } from './DanceStyleUpdateOneRequiredWithoutVideosNestedInput.schema'
import { ProfileUpdateOneWithoutVideosAddedNestedInputObjectSchema } from './ProfileUpdateOneWithoutVideosAddedNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoUpdateInput> = z
  .object({
    id: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    url: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    style: z
      .lazy(
        () => DanceStyleUpdateOneRequiredWithoutVideosNestedInputObjectSchema
      )
      .optional(),
    createdBy: z
      .lazy(() => ProfileUpdateOneWithoutVideosAddedNestedInputObjectSchema)
      .optional(),
  })
  .strict()

export const VideoUpdateInputObjectSchema = Schema
