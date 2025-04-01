import { z } from 'zod'
import { CityUpdateWithoutProfilesInputObjectSchema } from './CityUpdateWithoutProfilesInput.schema'
import { CityUncheckedUpdateWithoutProfilesInputObjectSchema } from './CityUncheckedUpdateWithoutProfilesInput.schema'
import { CityCreateWithoutProfilesInputObjectSchema } from './CityCreateWithoutProfilesInput.schema'
import { CityUncheckedCreateWithoutProfilesInputObjectSchema } from './CityUncheckedCreateWithoutProfilesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityUpsertWithoutProfilesInput> = z
  .object({
    update: z.union([
      z.lazy(() => CityUpdateWithoutProfilesInputObjectSchema),
      z.lazy(() => CityUncheckedUpdateWithoutProfilesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => CityCreateWithoutProfilesInputObjectSchema),
      z.lazy(() => CityUncheckedCreateWithoutProfilesInputObjectSchema),
    ]),
  })
  .strict()

export const CityUpsertWithoutProfilesInputObjectSchema = Schema
