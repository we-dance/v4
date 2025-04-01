import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithoutVenueInputObjectSchema } from './EventUpdateWithoutVenueInput.schema'
import { EventUncheckedUpdateWithoutVenueInputObjectSchema } from './EventUncheckedUpdateWithoutVenueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutVenueInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => EventUpdateWithoutVenueInputObjectSchema),
      z.lazy(() => EventUncheckedUpdateWithoutVenueInputObjectSchema),
    ]),
  })
  .strict()

export const EventUpdateWithWhereUniqueWithoutVenueInputObjectSchema = Schema
