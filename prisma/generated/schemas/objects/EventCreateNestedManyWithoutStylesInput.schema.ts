import { z } from 'zod'
import { EventCreateWithoutStylesInputObjectSchema } from './EventCreateWithoutStylesInput.schema'
import { EventUncheckedCreateWithoutStylesInputObjectSchema } from './EventUncheckedCreateWithoutStylesInput.schema'
import { EventCreateOrConnectWithoutStylesInputObjectSchema } from './EventCreateOrConnectWithoutStylesInput.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateNestedManyWithoutStylesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => EventCreateWithoutStylesInputObjectSchema),
        z.lazy(() => EventCreateWithoutStylesInputObjectSchema).array(),
        z.lazy(() => EventUncheckedCreateWithoutStylesInputObjectSchema),
        z
          .lazy(() => EventUncheckedCreateWithoutStylesInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => EventCreateOrConnectWithoutStylesInputObjectSchema),
        z
          .lazy(() => EventCreateOrConnectWithoutStylesInputObjectSchema)
          .array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => EventWhereUniqueInputObjectSchema),
        z.lazy(() => EventWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const EventCreateNestedManyWithoutStylesInputObjectSchema = Schema
