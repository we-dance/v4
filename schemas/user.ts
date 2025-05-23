import * as z from 'zod'

export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required.').nullable(),
  lastName: z.string().min(1, 'Last name is required.').nullable(),
  phone: z
    .string()
    .min(1, 'Phone is required.')
    .refine((value) => value.startsWith('+'), {
      message: 'Please select a country code for your phone number.',
    })
    .nullable(),
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

export const defaultNotificationsSettings = {
  email: {
    events: true,
    messages: true,
    community: true,
    marketing: true,
  },
  push: {
    events: true,
    messages: true,
    mentions: true,
  },
  frequency: 'immediately',
}

export type User = z.infer<typeof userSchema>
export type LoggedInUser = z.infer<typeof loggedInUserSchema>
export type NotificationSettings = z.infer<typeof notificationSettingsSchema>
