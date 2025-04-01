import { z } from 'zod'
import { DanceStyleWhereUniqueInputObjectSchema } from './DanceStyleWhereUniqueInput.schema'
import { DanceStyleCreateWithoutExperiencesInputObjectSchema } from './DanceStyleCreateWithoutExperiencesInput.schema'
import { DanceStyleUncheckedCreateWithoutExperiencesInputObjectSchema } from './DanceStyleUncheckedCreateWithoutExperiencesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleCreateOrConnectWithoutExperiencesInput> =
  z
    .object({
      where: z.lazy(() => DanceStyleWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => DanceStyleCreateWithoutExperiencesInputObjectSchema),
        z.lazy(
          () => DanceStyleUncheckedCreateWithoutExperiencesInputObjectSchema
        ),
      ]),
    })
    .strict()

export const DanceStyleCreateOrConnectWithoutExperiencesInputObjectSchema =
  Schema
