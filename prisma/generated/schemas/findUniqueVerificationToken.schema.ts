import { z } from 'zod'
import { VerificationTokenSelectObjectSchema } from './objects/VerificationTokenSelect.schema'
import { VerificationTokenWhereUniqueInputObjectSchema } from './objects/VerificationTokenWhereUniqueInput.schema'

export const VerificationTokenFindUniqueSchema = z.object({
  select: VerificationTokenSelectObjectSchema.optional(),
  where: VerificationTokenWhereUniqueInputObjectSchema,
})
