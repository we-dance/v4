import { z } from 'zod'
import { DanceStyleScalarWhereInputObjectSchema } from './DanceStyleScalarWhereInput.schema'
import { DanceStyleUpdateManyMutationInputObjectSchema } from './DanceStyleUpdateManyMutationInput.schema'
import { DanceStyleUncheckedUpdateManyWithoutStylesInputObjectSchema } from './DanceStyleUncheckedUpdateManyWithoutStylesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleUpdateManyWithWhereWithoutEventsInput> =
  z
    .object({
      where: z.lazy(() => DanceStyleScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => DanceStyleUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => DanceStyleUncheckedUpdateManyWithoutStylesInputObjectSchema
        ),
      ]),
    })
    .strict()

export const DanceStyleUpdateManyWithWhereWithoutEventsInputObjectSchema =
  Schema
