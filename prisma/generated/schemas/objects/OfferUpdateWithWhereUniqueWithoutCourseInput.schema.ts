import { z } from 'zod'
import { OfferWhereUniqueInputObjectSchema } from './OfferWhereUniqueInput.schema'
import { OfferUpdateWithoutCourseInputObjectSchema } from './OfferUpdateWithoutCourseInput.schema'
import { OfferUncheckedUpdateWithoutCourseInputObjectSchema } from './OfferUncheckedUpdateWithoutCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferUpdateWithWhereUniqueWithoutCourseInput> = z
  .object({
    where: z.lazy(() => OfferWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => OfferUpdateWithoutCourseInputObjectSchema),
      z.lazy(() => OfferUncheckedUpdateWithoutCourseInputObjectSchema),
    ]),
  })
  .strict()

export const OfferUpdateWithWhereUniqueWithoutCourseInputObjectSchema = Schema
