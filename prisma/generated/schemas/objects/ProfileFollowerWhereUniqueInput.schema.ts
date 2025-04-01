import { z } from 'zod'
import { ProfileFollowerFollowerIdProfileIdCompoundUniqueInputObjectSchema } from './ProfileFollowerFollowerIdProfileIdCompoundUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerWhereUniqueInput> = z
  .object({
    id: z.number().optional(),
    followerId_profileId: z
      .lazy(
        () => ProfileFollowerFollowerIdProfileIdCompoundUniqueInputObjectSchema
      )
      .optional(),
  })
  .strict()

export const ProfileFollowerWhereUniqueInputObjectSchema = Schema
