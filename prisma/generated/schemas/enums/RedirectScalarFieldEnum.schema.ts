import { z } from 'zod'

export const RedirectScalarFieldEnumSchema = z.enum([
  'id',
  'from',
  'to',
  'note',
  'createdAt',
  'updatedAt',
])
