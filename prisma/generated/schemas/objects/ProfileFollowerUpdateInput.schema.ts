import { z } from 'zod'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { ProfileUpdateOneRequiredWithoutFollowingNestedInputObjectSchema } from './ProfileUpdateOneRequiredWithoutFollowingNestedInput.schema'
import { ProfileUpdateOneRequiredWithoutFollowersNestedInputObjectSchema } from './ProfileUpdateOneRequiredWithoutFollowersNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerUpdateInput> = z
  .object({
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    follower: z
      .lazy(
        () => ProfileUpdateOneRequiredWithoutFollowingNestedInputObjectSchema
      )
      .optional(),
    profile: z
      .lazy(
        () => ProfileUpdateOneRequiredWithoutFollowersNestedInputObjectSchema
      )
      .optional(),
  })
  .strict()

export const ProfileFollowerUpdateInputObjectSchema = Schema
