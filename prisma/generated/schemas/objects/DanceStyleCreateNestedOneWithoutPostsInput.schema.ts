import { z } from 'zod'
import { DanceStyleCreateWithoutPostsInputObjectSchema } from './DanceStyleCreateWithoutPostsInput.schema'
import { DanceStyleUncheckedCreateWithoutPostsInputObjectSchema } from './DanceStyleUncheckedCreateWithoutPostsInput.schema'
import { DanceStyleCreateOrConnectWithoutPostsInputObjectSchema } from './DanceStyleCreateOrConnectWithoutPostsInput.schema'
import { DanceStyleWhereUniqueInputObjectSchema } from './DanceStyleWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleCreateNestedOneWithoutPostsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => DanceStyleCreateWithoutPostsInputObjectSchema),
        z.lazy(() => DanceStyleUncheckedCreateWithoutPostsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => DanceStyleCreateOrConnectWithoutPostsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => DanceStyleWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const DanceStyleCreateNestedOneWithoutPostsInputObjectSchema = Schema
