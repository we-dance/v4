import { z } from 'zod'

export const VoteScalarFieldEnumSchema = z.enum([
  'id',
  'winnerId',
  'loserId',
  'createdAt',
  'updatedAt',
  'createdById',
])
