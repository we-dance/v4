import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutCreatedByInputObjectSchema } from './ProfileCreateWithoutCreatedByInput.schema'
import { ProfileUncheckedCreateWithoutCreatedByInputObjectSchema } from './ProfileUncheckedCreateWithoutCreatedByInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutCreatedByInput> = z
  .object({
    where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutCreatedByInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutCreatedByInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileCreateOrConnectWithoutCreatedByInputObjectSchema = Schema
