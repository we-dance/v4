import { z } from 'zod'
import { OfferWhereInputObjectSchema } from './objects/OfferWhereInput.schema'

export const OfferDeleteManySchema = z.object({
  where: OfferWhereInputObjectSchema.optional(),
})
