import { z } from 'zod'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { ProfileUpdateOneRequiredWithoutFollowingNestedInputObjectSchema } from './ProfileUpdateOneRequiredWithoutFollowingNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerUpdateWithoutProfileInput> = z
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
  })
  .strict()

export const ProfileFollowerUpdateWithoutProfileInputObjectSchema = Schema
