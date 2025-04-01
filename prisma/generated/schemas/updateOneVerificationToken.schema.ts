import { z } from 'zod'
import { VerificationTokenSelectObjectSchema } from './objects/VerificationTokenSelect.schema'
import { VerificationTokenUpdateInputObjectSchema } from './objects/VerificationTokenUpdateInput.schema'
import { VerificationTokenUncheckedUpdateInputObjectSchema } from './objects/VerificationTokenUncheckedUpdateInput.schema'
import { VerificationTokenWhereUniqueInputObjectSchema } from './objects/VerificationTokenWhereUniqueInput.schema'

export const VerificationTokenUpdateOneSchema = z.object({
  select: VerificationTokenSelectObjectSchema.optional(),
  data: z.union([
    VerificationTokenUpdateInputObjectSchema,
    VerificationTokenUncheckedUpdateInputObjectSchema,
  ]),
  where: VerificationTokenWhereUniqueInputObjectSchema,
})
