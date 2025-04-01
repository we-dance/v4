import { z } from 'zod'

export const CountryScalarFieldEnumSchema = z.enum([
  'code',
  'name',
  'createdAt',
  'updatedAt',
])
