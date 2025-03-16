import * as z from 'zod'

export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  phone: z.string().min(1, 'Phone is required.'),
  email: z.string().email(),
})

export const loggedInUserSchema = userSchema.extend({
  userId: z.string(),
})

const passwordRule = z
  .string()
  .min(8, 'Password must be at least 8 characters.')

export const registerSchema = userSchema.extend({
  password: passwordRule,
  emailConsent: z.boolean({ coerce: true }).refine((value) => value, {
    message: 'We need your consent to send you emails.',
  }),
})

export const passwordSchema = z
  .object({
    currentPassword: passwordRule,
    newPassword: passwordRule,
    confirmPassword: passwordRule,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const notificationSettingsSchema = z.object({
  email: z.object({
    events: z.boolean(),
    messages: z.boolean(),
    community: z.boolean(),
    marketing: z.boolean(),
  }),
  push: z.object({
    events: z.boolean(),
    messages: z.boolean(),
    mentions: z.boolean(),
  }),
  frequency: z.enum(['immediately', 'daily', 'weekly', 'never']),
})

export const privacySettingsSchema = z.object({
  profileVisibility: z.enum(['public', 'members', 'connections']),
  contactPreferences: z.object({
    allowMessages: z.boolean(),
    showEmail: z.boolean(),
    showPhone: z.boolean(),
  }),
  activityVisibility: z.object({
    showOnlineStatus: z.boolean(),
    showEventAttendance: z.boolean(),
  }),
  dataUsage: z.object({
    allowAnalytics: z.boolean(),
    allowPersonalization: z.boolean(),
  }),
})

export type User = z.infer<typeof userSchema>
export type LoggedInUser = z.infer<typeof loggedInUserSchema>
export type NotificationSettings = z.infer<typeof notificationSettingsSchema>
export type PrivacySettings = z.infer<typeof privacySettingsSchema>
