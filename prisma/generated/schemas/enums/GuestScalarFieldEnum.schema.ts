import { z } from 'zod'

export const GuestScalarFieldEnumSchema = z.enum([
  'id',
  'profileId',
  'eventId',
  'role',
  'status',
  'invitedAt',
  'confirmedAt',
  'cancelledAt',
  'registeredAt',
  'waitlistedAt',
  'createdAt',
  'updatedAt',
])
