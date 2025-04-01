import { z } from 'zod'

export const EventScalarFieldEnumSchema = z.enum([
  'id',
  'shortId',
  'slug',
  'name',
  'startDate',
  'endDate',
  'type',
  'description',
  'cover',
  'price',
  'firebaseId',
  'published',
  'creatorId',
  'organizerId',
  'venueId',
  'createdAt',
  'updatedAt',
])
