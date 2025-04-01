import { z } from 'zod'
import { DanceStyleSelectObjectSchema } from './objects/DanceStyleSelect.schema'
import { DanceStyleIncludeObjectSchema } from './objects/DanceStyleInclude.schema'
import { DanceStyleCreateInputObjectSchema } from './objects/DanceStyleCreateInput.schema'
import { DanceStyleUncheckedCreateInputObjectSchema } from './objects/DanceStyleUncheckedCreateInput.schema'

export const DanceStyleCreateOneSchema = z.object({
  select: DanceStyleSelectObjectSchema.optional(),
  include: DanceStyleIncludeObjectSchema.optional(),
  data: z.union([
    DanceStyleCreateInputObjectSchema,
    DanceStyleUncheckedCreateInputObjectSchema,
  ]),
})
