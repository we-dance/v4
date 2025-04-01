import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutStylesInputObjectSchema } from './ProfileCreateWithoutStylesInput.schema'
import { ProfileUncheckedCreateWithoutStylesInputObjectSchema } from './ProfileUncheckedCreateWithoutStylesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutStylesInput> = z
  .object({
    where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutStylesInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutStylesInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileCreateOrConnectWithoutStylesInputObjectSchema = Schema
