import { z } from 'zod'
import { DanceStyleSelectObjectSchema } from './objects/DanceStyleSelect.schema'
import { DanceStyleIncludeObjectSchema } from './objects/DanceStyleInclude.schema'
import { DanceStyleWhereUniqueInputObjectSchema } from './objects/DanceStyleWhereUniqueInput.schema'
import { DanceStyleCreateInputObjectSchema } from './objects/DanceStyleCreateInput.schema'
import { DanceStyleUncheckedCreateInputObjectSchema } from './objects/DanceStyleUncheckedCreateInput.schema'
import { DanceStyleUpdateInputObjectSchema } from './objects/DanceStyleUpdateInput.schema'
import { DanceStyleUncheckedUpdateInputObjectSchema } from './objects/DanceStyleUncheckedUpdateInput.schema'

export const DanceStyleUpsertSchema = z.object({
  select: DanceStyleSelectObjectSchema.optional(),
  include: DanceStyleIncludeObjectSchema.optional(),
  where: DanceStyleWhereUniqueInputObjectSchema,
  create: z.union([
    DanceStyleCreateInputObjectSchema,
    DanceStyleUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    DanceStyleUpdateInputObjectSchema,
    DanceStyleUncheckedUpdateInputObjectSchema,
  ]),
})
