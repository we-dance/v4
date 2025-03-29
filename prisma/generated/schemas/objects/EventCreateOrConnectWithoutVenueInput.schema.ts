import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventCreateWithoutVenueInputObjectSchema } from './EventCreateWithoutVenueInput.schema'
import { EventUncheckedCreateWithoutVenueInputObjectSchema } from './EventUncheckedCreateWithoutVenueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateOrConnectWithoutVenueInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => EventCreateWithoutVenueInputObjectSchema),
      z.lazy(() => EventUncheckedCreateWithoutVenueInputObjectSchema),
    ]),
  })
  .strict()

export const EventCreateOrConnectWithoutVenueInputObjectSchema = Schema
