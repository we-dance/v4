import { z } from 'zod'
import { OfferCreateWithoutCourseInputObjectSchema } from './OfferCreateWithoutCourseInput.schema'
import { OfferUncheckedCreateWithoutCourseInputObjectSchema } from './OfferUncheckedCreateWithoutCourseInput.schema'
import { OfferCreateOrConnectWithoutCourseInputObjectSchema } from './OfferCreateOrConnectWithoutCourseInput.schema'
import { OfferCreateManyCourseInputEnvelopeObjectSchema } from './OfferCreateManyCourseInputEnvelope.schema'
import { OfferWhereUniqueInputObjectSchema } from './OfferWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferUncheckedCreateNestedManyWithoutCourseInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => OfferCreateWithoutCourseInputObjectSchema),
          z.lazy(() => OfferCreateWithoutCourseInputObjectSchema).array(),
          z.lazy(() => OfferUncheckedCreateWithoutCourseInputObjectSchema),
          z
            .lazy(() => OfferUncheckedCreateWithoutCourseInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => OfferCreateOrConnectWithoutCourseInputObjectSchema),
          z
            .lazy(() => OfferCreateOrConnectWithoutCourseInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => OfferCreateManyCourseInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => OfferWhereUniqueInputObjectSchema),
          z.lazy(() => OfferWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const OfferUncheckedCreateNestedManyWithoutCourseInputObjectSchema =
  Schema
