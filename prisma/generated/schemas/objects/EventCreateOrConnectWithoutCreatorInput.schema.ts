import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventCreateWithoutCreatorInputObjectSchema } from './EventCreateWithoutCreatorInput.schema'
import { EventUncheckedCreateWithoutCreatorInputObjectSchema } from './EventUncheckedCreateWithoutCreatorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateOrConnectWithoutCreatorInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => EventCreateWithoutCreatorInputObjectSchema),
      z.lazy(() => EventUncheckedCreateWithoutCreatorInputObjectSchema),
    ]),
  })
  .strict()

export const EventCreateOrConnectWithoutCreatorInputObjectSchema = Schema
