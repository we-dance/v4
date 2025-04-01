import { z } from 'zod'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { ProfileUpdateOneRequiredWithoutFollowersNestedInputObjectSchema } from './ProfileUpdateOneRequiredWithoutFollowersNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerUpdateWithoutFollowerInput> = z
  .object({
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    profile: z
      .lazy(
        () => ProfileUpdateOneRequiredWithoutFollowersNestedInputObjectSchema
      )
      .optional(),
  })
  .strict()

export const ProfileFollowerUpdateWithoutFollowerInputObjectSchema = Schema
