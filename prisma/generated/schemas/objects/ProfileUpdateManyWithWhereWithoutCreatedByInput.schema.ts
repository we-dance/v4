import { z } from 'zod'
import { ProfileScalarWhereInputObjectSchema } from './ProfileScalarWhereInput.schema'
import { ProfileUpdateManyMutationInputObjectSchema } from './ProfileUpdateManyMutationInput.schema'
import { ProfileUncheckedUpdateManyWithoutProfilesCreatedInputObjectSchema } from './ProfileUncheckedUpdateManyWithoutProfilesCreatedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateManyWithWhereWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => ProfileScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ProfileUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            ProfileUncheckedUpdateManyWithoutProfilesCreatedInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ProfileUpdateManyWithWhereWithoutCreatedByInputObjectSchema =
  Schema
