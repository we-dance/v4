import { z } from 'zod'
import { DanceStyleCreateWithoutExperiencesInputObjectSchema } from './DanceStyleCreateWithoutExperiencesInput.schema'
import { DanceStyleUncheckedCreateWithoutExperiencesInputObjectSchema } from './DanceStyleUncheckedCreateWithoutExperiencesInput.schema'
import { DanceStyleCreateOrConnectWithoutExperiencesInputObjectSchema } from './DanceStyleCreateOrConnectWithoutExperiencesInput.schema'
import { DanceStyleWhereUniqueInputObjectSchema } from './DanceStyleWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleCreateNestedOneWithoutExperiencesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DanceStyleCreateWithoutExperiencesInputObjectSchema),
          z.lazy(
            () => DanceStyleUncheckedCreateWithoutExperiencesInputObjectSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () => DanceStyleCreateOrConnectWithoutExperiencesInputObjectSchema
        )
        .optional(),
      connect: z.lazy(() => DanceStyleWhereUniqueInputObjectSchema).optional(),
    })
    .strict()

export const DanceStyleCreateNestedOneWithoutExperiencesInputObjectSchema =
  Schema
