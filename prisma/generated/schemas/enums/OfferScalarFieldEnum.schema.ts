import { z } from 'zod'

export const OfferScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'price',
  'currency',
  'duration',
  'validFrom',
  'validThrough',
  'courseId',
  'items',
  'createdAt',
  'updatedAt',
])
