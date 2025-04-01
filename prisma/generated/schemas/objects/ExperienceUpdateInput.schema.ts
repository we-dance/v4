import { z } from 'zod'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema'
import { ProfileUpdateOneRequiredWithoutStylesNestedInputObjectSchema } from './ProfileUpdateOneRequiredWithoutStylesNestedInput.schema'
import { DanceStyleUpdateOneRequiredWithoutExperiencesNestedInputObjectSchema } from './DanceStyleUpdateOneRequiredWithoutExperiencesNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceUpdateInput> = z
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
    profile: z
      .lazy(() => ProfileUpdateOneRequiredWithoutStylesNestedInputObjectSchema)
      .optional(),
    style: z
      .lazy(
        () =>
          DanceStyleUpdateOneRequiredWithoutExperiencesNestedInputObjectSchema
      )
      .optional(),
  })
  .strict()

export const ExperienceUpdateInputObjectSchema = Schema
