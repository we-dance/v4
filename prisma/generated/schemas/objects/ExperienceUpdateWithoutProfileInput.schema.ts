import { z } from 'zod'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema'
import { DanceStyleUpdateOneRequiredWithoutExperiencesNestedInputObjectSchema } from './DanceStyleUpdateOneRequiredWithoutExperiencesNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceUpdateWithoutProfileInput> = z
  .object({
    level: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    highlighted: z
      .union([
        z.boolean(),
        z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    style: z
      .lazy(
        () =>
          DanceStyleUpdateOneRequiredWithoutExperiencesNestedInputObjectSchema
      )
      .optional(),
  })
  .strict()

export const ExperienceUpdateWithoutProfileInputObjectSchema = Schema
