import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventCreateWithoutOrganizerInputObjectSchema } from './EventCreateWithoutOrganizerInput.schema'
import { EventUncheckedCreateWithoutOrganizerInputObjectSchema } from './EventUncheckedCreateWithoutOrganizerInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateOrConnectWithoutOrganizerInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => EventCreateWithoutOrganizerInputObjectSchema),
      z.lazy(() => EventUncheckedCreateWithoutOrganizerInputObjectSchema),
    ]),
  })
  .strict()

export const EventCreateOrConnectWithoutOrganizerInputObjectSchema = Schema
