import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventCreateWithoutPostsInputObjectSchema } from './EventCreateWithoutPostsInput.schema'
import { EventUncheckedCreateWithoutPostsInputObjectSchema } from './EventUncheckedCreateWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateOrConnectWithoutPostsInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => EventCreateWithoutPostsInputObjectSchema),
      z.lazy(() => EventUncheckedCreateWithoutPostsInputObjectSchema),
    ]),
  })
  .strict()

export const EventCreateOrConnectWithoutPostsInputObjectSchema = Schema
