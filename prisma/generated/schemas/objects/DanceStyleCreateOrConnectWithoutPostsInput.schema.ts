import { z } from 'zod'
import { DanceStyleWhereUniqueInputObjectSchema } from './DanceStyleWhereUniqueInput.schema'
import { DanceStyleCreateWithoutPostsInputObjectSchema } from './DanceStyleCreateWithoutPostsInput.schema'
import { DanceStyleUncheckedCreateWithoutPostsInputObjectSchema } from './DanceStyleUncheckedCreateWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleCreateOrConnectWithoutPostsInput> = z
  .object({
    where: z.lazy(() => DanceStyleWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => DanceStyleCreateWithoutPostsInputObjectSchema),
      z.lazy(() => DanceStyleUncheckedCreateWithoutPostsInputObjectSchema),
    ]),
  })
  .strict()

export const DanceStyleCreateOrConnectWithoutPostsInputObjectSchema = Schema
