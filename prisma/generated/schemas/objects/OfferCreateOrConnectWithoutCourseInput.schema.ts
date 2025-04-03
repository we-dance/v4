import { z } from 'zod'
import { OfferWhereUniqueInputObjectSchema } from './OfferWhereUniqueInput.schema'
import { OfferCreateWithoutCourseInputObjectSchema } from './OfferCreateWithoutCourseInput.schema'
import { OfferUncheckedCreateWithoutCourseInputObjectSchema } from './OfferUncheckedCreateWithoutCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferCreateOrConnectWithoutCourseInput> = z
  .object({
    where: z.lazy(() => OfferWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => OfferCreateWithoutCourseInputObjectSchema),
      z.lazy(() => OfferUncheckedCreateWithoutCourseInputObjectSchema),
    ]),
  })
  .strict()

export const OfferCreateOrConnectWithoutCourseInputObjectSchema = Schema
