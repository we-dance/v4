import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventCreateWithoutStylesInputObjectSchema } from './EventCreateWithoutStylesInput.schema'
import { EventUncheckedCreateWithoutStylesInputObjectSchema } from './EventUncheckedCreateWithoutStylesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateOrConnectWithoutStylesInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => EventCreateWithoutStylesInputObjectSchema),
      z.lazy(() => EventUncheckedCreateWithoutStylesInputObjectSchema),
    ]),
  })
  .strict()

export const EventCreateOrConnectWithoutStylesInputObjectSchema = Schema
