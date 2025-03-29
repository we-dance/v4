import { z } from 'zod'
import { DanceStyleCreateWithoutExperiencesInputObjectSchema } from './DanceStyleCreateWithoutExperiencesInput.schema'
import { DanceStyleUncheckedCreateWithoutExperiencesInputObjectSchema } from './DanceStyleUncheckedCreateWithoutExperiencesInput.schema'
import { DanceStyleCreateOrConnectWithoutExperiencesInputObjectSchema } from './DanceStyleCreateOrConnectWithoutExperiencesInput.schema'
import { DanceStyleUpsertWithoutExperiencesInputObjectSchema } from './DanceStyleUpsertWithoutExperiencesInput.schema'
import { DanceStyleWhereUniqueInputObjectSchema } from './DanceStyleWhereUniqueInput.schema'
import { DanceStyleUpdateWithoutExperiencesInputObjectSchema } from './DanceStyleUpdateWithoutExperiencesInput.schema'
import { DanceStyleUncheckedUpdateWithoutExperiencesInputObjectSchema } from './DanceStyleUncheckedUpdateWithoutExperiencesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleUpdateOneRequiredWithoutExperiencesNestedInput> =
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
      upsert: z
        .lazy(() => DanceStyleUpsertWithoutExperiencesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => DanceStyleWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => DanceStyleUpdateWithoutExperiencesInputObjectSchema),
          z.lazy(
            () => DanceStyleUncheckedUpdateWithoutExperiencesInputObjectSchema
          ),
        ])
        .optional(),
    })
    .strict()

export const DanceStyleUpdateOneRequiredWithoutExperiencesNestedInputObjectSchema =
  Schema
