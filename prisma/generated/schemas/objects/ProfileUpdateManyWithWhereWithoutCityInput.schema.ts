import { z } from 'zod'
import { ProfileScalarWhereInputObjectSchema } from './ProfileScalarWhereInput.schema'
import { ProfileUpdateManyMutationInputObjectSchema } from './ProfileUpdateManyMutationInput.schema'
import { ProfileUncheckedUpdateManyWithoutProfilesInputObjectSchema } from './ProfileUncheckedUpdateManyWithoutProfilesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateManyWithWhereWithoutCityInput> = z
  .object({
    where: z.lazy(() => ProfileScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => ProfileUpdateManyMutationInputObjectSchema),
      z.lazy(() => ProfileUncheckedUpdateManyWithoutProfilesInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileUpdateManyWithWhereWithoutCityInputObjectSchema = Schema
