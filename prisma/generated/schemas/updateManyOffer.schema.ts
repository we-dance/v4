import { z } from 'zod'
import { OfferUpdateManyMutationInputObjectSchema } from './objects/OfferUpdateManyMutationInput.schema'
import { OfferWhereInputObjectSchema } from './objects/OfferWhereInput.schema'

export const OfferUpdateManySchema = z.object({
  data: OfferUpdateManyMutationInputObjectSchema,
  where: OfferWhereInputObjectSchema.optional(),
})
