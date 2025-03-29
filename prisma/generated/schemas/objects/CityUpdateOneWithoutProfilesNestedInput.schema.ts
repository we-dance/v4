import { z } from 'zod'
import { CityCreateWithoutProfilesInputObjectSchema } from './CityCreateWithoutProfilesInput.schema'
import { CityUncheckedCreateWithoutProfilesInputObjectSchema } from './CityUncheckedCreateWithoutProfilesInput.schema'
import { CityCreateOrConnectWithoutProfilesInputObjectSchema } from './CityCreateOrConnectWithoutProfilesInput.schema'
import { CityUpsertWithoutProfilesInputObjectSchema } from './CityUpsertWithoutProfilesInput.schema'
import { CityWhereUniqueInputObjectSchema } from './CityWhereUniqueInput.schema'
import { CityUpdateWithoutProfilesInputObjectSchema } from './CityUpdateWithoutProfilesInput.schema'
import { CityUncheckedUpdateWithoutProfilesInputObjectSchema } from './CityUncheckedUpdateWithoutProfilesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityUpdateOneWithoutProfilesNestedInput> = z
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
    upsert: z.lazy(() => CityUpsertWithoutProfilesInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => CityWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => CityUpdateWithoutProfilesInputObjectSchema),
        z.lazy(() => CityUncheckedUpdateWithoutProfilesInputObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const CityUpdateOneWithoutProfilesNestedInputObjectSchema = Schema
