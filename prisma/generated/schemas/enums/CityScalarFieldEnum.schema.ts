import { z } from 'zod'

export const CityScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'region',
  'countryCode',
  'description',
  'slug',
  'lat',
  'lng',
  'membersCount',
  'subscribersCount',
  'viewsCount',
  'createdAt',
  'updatedAt',
])
