import { z } from 'zod'

export const ProfileFollowerScalarFieldEnumSchema = z.enum([
  'id',
  'followerId',
  'profileId',
  'createdAt',
])
