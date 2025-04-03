import { z } from 'zod'
import { DanceStyleCreateWithoutPostsInputObjectSchema } from './DanceStyleCreateWithoutPostsInput.schema'
import { DanceStyleUncheckedCreateWithoutPostsInputObjectSchema } from './DanceStyleUncheckedCreateWithoutPostsInput.schema'
import { DanceStyleCreateOrConnectWithoutPostsInputObjectSchema } from './DanceStyleCreateOrConnectWithoutPostsInput.schema'
import { DanceStyleUpsertWithoutPostsInputObjectSchema } from './DanceStyleUpsertWithoutPostsInput.schema'
import { DanceStyleWhereUniqueInputObjectSchema } from './DanceStyleWhereUniqueInput.schema'
import { DanceStyleUpdateWithoutPostsInputObjectSchema } from './DanceStyleUpdateWithoutPostsInput.schema'
import { DanceStyleUncheckedUpdateWithoutPostsInputObjectSchema } from './DanceStyleUncheckedUpdateWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleUpdateOneWithoutPostsNestedInput> = z
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
    upsert: z
      .lazy(() => DanceStyleUpsertWithoutPostsInputObjectSchema)
      .optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => DanceStyleWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => DanceStyleUpdateWithoutPostsInputObjectSchema),
        z.lazy(() => DanceStyleUncheckedUpdateWithoutPostsInputObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const DanceStyleUpdateOneWithoutPostsNestedInputObjectSchema = Schema
