import { z } from 'zod'
import { EventCreateWithoutCreatorInputObjectSchema } from './EventCreateWithoutCreatorInput.schema'
import { EventUncheckedCreateWithoutCreatorInputObjectSchema } from './EventUncheckedCreateWithoutCreatorInput.schema'
import { EventCreateOrConnectWithoutCreatorInputObjectSchema } from './EventCreateOrConnectWithoutCreatorInput.schema'
import { EventCreateManyCreatorInputEnvelopeObjectSchema } from './EventCreateManyCreatorInputEnvelope.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateNestedManyWithoutCreatorInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => EventCreateWithoutCreatorInputObjectSchema),
        z.lazy(() => EventCreateWithoutCreatorInputObjectSchema).array(),
        z.lazy(() => EventUncheckedCreateWithoutCreatorInputObjectSchema),
        z
          .lazy(() => EventUncheckedCreateWithoutCreatorInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => EventCreateOrConnectWithoutCreatorInputObjectSchema),
        z
          .lazy(() => EventCreateOrConnectWithoutCreatorInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => EventCreateManyCreatorInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => EventWhereUniqueInputObjectSchema),
        z.lazy(() => EventWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const EventCreateNestedManyWithoutCreatorInputObjectSchema = Schema
