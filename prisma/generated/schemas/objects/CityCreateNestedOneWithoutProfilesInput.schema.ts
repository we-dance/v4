import { z } from 'zod'
import { CityCreateWithoutProfilesInputObjectSchema } from './CityCreateWithoutProfilesInput.schema'
import { CityUncheckedCreateWithoutProfilesInputObjectSchema } from './CityUncheckedCreateWithoutProfilesInput.schema'
import { CityCreateOrConnectWithoutProfilesInputObjectSchema } from './CityCreateOrConnectWithoutProfilesInput.schema'
import { CityWhereUniqueInputObjectSchema } from './CityWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityCreateNestedOneWithoutProfilesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => CityCreateWithoutProfilesInputObjectSchema),
        z.lazy(() => CityUncheckedCreateWithoutProfilesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CityCreateOrConnectWithoutProfilesInputObjectSchema)
      .optional(),
    connect: z.lazy(() => CityWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const CityCreateNestedOneWithoutProfilesInputObjectSchema = Schema
