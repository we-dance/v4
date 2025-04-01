import { z } from 'zod'
import { ProfileCreateWithoutStylesInputObjectSchema } from './ProfileCreateWithoutStylesInput.schema'
import { ProfileUncheckedCreateWithoutStylesInputObjectSchema } from './ProfileUncheckedCreateWithoutStylesInput.schema'
import { ProfileCreateOrConnectWithoutStylesInputObjectSchema } from './ProfileCreateOrConnectWithoutStylesInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutStylesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProfileCreateWithoutStylesInputObjectSchema),
        z.lazy(() => ProfileUncheckedCreateWithoutStylesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ProfileCreateOrConnectWithoutStylesInputObjectSchema)
      .optional(),
    connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const ProfileCreateNestedOneWithoutStylesInputObjectSchema = Schema
