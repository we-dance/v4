import { z } from 'zod'

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'email',
  'name',
  'firstName',
  'lastName',
  'phone',
  'emailConsent',
  'emailConsentAt',
  'salt',
  'hash',
  'firebaseId',
  'emailVerified',
  'isDeleted',
  'deletedAt',
  'deletedReason',
  'notificationSettings',
  'createdAt',
  'updatedAt',
  'lastLoginAt',
])
