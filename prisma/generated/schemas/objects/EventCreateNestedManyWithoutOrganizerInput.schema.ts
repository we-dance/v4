import { z } from 'zod'
import { EventCreateWithoutOrganizerInputObjectSchema } from './EventCreateWithoutOrganizerInput.schema'
import { EventUncheckedCreateWithoutOrganizerInputObjectSchema } from './EventUncheckedCreateWithoutOrganizerInput.schema'
import { EventCreateOrConnectWithoutOrganizerInputObjectSchema } from './EventCreateOrConnectWithoutOrganizerInput.schema'
import { EventCreateManyOrganizerInputEnvelopeObjectSchema } from './EventCreateManyOrganizerInputEnvelope.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateNestedManyWithoutOrganizerInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => EventCreateWithoutOrganizerInputObjectSchema),
        z.lazy(() => EventCreateWithoutOrganizerInputObjectSchema).array(),
        z.lazy(() => EventUncheckedCreateWithoutOrganizerInputObjectSchema),
        z
          .lazy(() => EventUncheckedCreateWithoutOrganizerInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => EventCreateOrConnectWithoutOrganizerInputObjectSchema),
        z
          .lazy(() => EventCreateOrConnectWithoutOrganizerInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => EventCreateManyOrganizerInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => EventWhereUniqueInputObjectSchema),
        z.lazy(() => EventWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const EventCreateNestedManyWithoutOrganizerInputObjectSchema = Schema
