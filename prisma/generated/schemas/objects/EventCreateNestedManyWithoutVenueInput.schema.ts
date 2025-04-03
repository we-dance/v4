import { z } from 'zod'
import { EventCreateWithoutVenueInputObjectSchema } from './EventCreateWithoutVenueInput.schema'
import { EventUncheckedCreateWithoutVenueInputObjectSchema } from './EventUncheckedCreateWithoutVenueInput.schema'
import { EventCreateOrConnectWithoutVenueInputObjectSchema } from './EventCreateOrConnectWithoutVenueInput.schema'
import { EventCreateManyVenueInputEnvelopeObjectSchema } from './EventCreateManyVenueInputEnvelope.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateNestedManyWithoutVenueInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => EventCreateWithoutVenueInputObjectSchema),
        z.lazy(() => EventCreateWithoutVenueInputObjectSchema).array(),
        z.lazy(() => EventUncheckedCreateWithoutVenueInputObjectSchema),
        z.lazy(() => EventUncheckedCreateWithoutVenueInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => EventCreateOrConnectWithoutVenueInputObjectSchema),
        z.lazy(() => EventCreateOrConnectWithoutVenueInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => EventCreateManyVenueInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => EventWhereUniqueInputObjectSchema),
        z.lazy(() => EventWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const EventCreateNestedManyWithoutVenueInputObjectSchema = Schema
