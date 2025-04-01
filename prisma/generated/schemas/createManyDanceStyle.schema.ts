import { z } from 'zod'
import { DanceStyleCreateManyInputObjectSchema } from './objects/DanceStyleCreateManyInput.schema'

export const DanceStyleCreateManySchema = z.object({
  data: z.union([
    DanceStyleCreateManyInputObjectSchema,
    z.array(DanceStyleCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
