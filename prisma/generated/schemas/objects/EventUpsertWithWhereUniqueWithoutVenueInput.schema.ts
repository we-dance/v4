import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithoutVenueInputObjectSchema } from './EventUpdateWithoutVenueInput.schema'
import { EventUncheckedUpdateWithoutVenueInputObjectSchema } from './EventUncheckedUpdateWithoutVenueInput.schema'
import { EventCreateWithoutVenueInputObjectSchema } from './EventCreateWithoutVenueInput.schema'
import { EventUncheckedCreateWithoutVenueInputObjectSchema } from './EventUncheckedCreateWithoutVenueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutVenueInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => EventUpdateWithoutVenueInputObjectSchema),
      z.lazy(() => EventUncheckedUpdateWithoutVenueInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => EventCreateWithoutVenueInputObjectSchema),
      z.lazy(() => EventUncheckedCreateWithoutVenueInputObjectSchema),
    ]),
  })
  .strict()

export const EventUpsertWithWhereUniqueWithoutVenueInputObjectSchema = Schema
