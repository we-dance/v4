<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useForm } from 'vee-validate'
import { useMutation } from 'vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const { data } = useAppAuth()

// Define notification settings schema with proper types
const notificationSettingsSchema = z.object({
  email: z.object({
    events: z.boolean().default(true),
    messages: z.boolean().default(true),
    community: z.boolean().default(true),
    marketing: z.boolean().default(false),
  }),
  push: z.object({
    events: z.boolean().default(true),
    messages: z.boolean().default(true),
    mentions: z.boolean().default(true),
  }),
  frequency: z
    .enum(['immediately', 'daily', 'weekly', 'never'])
    .default('daily'),
})

// Define the type based on the schema
type NotificationSettings = z.infer<typeof notificationSettingsSchema>

// Get initial notification settings from user data or use defaults
const initialSettings: NotificationSettings = {
  email: {
    events: true,
    messages: true,
    community: true,
    marketing: false,
  },
  push: {
    events: true,
    messages: true,
    mentions: true,
  },
  frequency: 'daily',
}

// Initialize form with validation schema
const form = useForm({
  validationSchema: toTypedSchema(notificationSettingsSchema),
  initialValues: initialSettings,
})

// Create a reactive reference to form values for easier access in template
const notificationSettings = computed(() => form.values as NotificationSettings)

const { $client } = useNuxtApp()

// Mutation for updating notification settings
const updateNotificationsMutation = useMutation(
  async (values: NotificationSettings) => {
    if (!data.value) {
      throw new Error('User not authenticated')
    }

    // Mock implementation - in a real app, replace with the actual API endpoint
    // This is just a placeholder until the actual API endpoint is implemented
    console.log('Saving notification settings:', values)

    // Simulate API call success
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 500)
    })
  },
  {
    onSuccess: () => {
      toast.success('Notification settings updated', {
        description:
          'Your notification preferences have been saved successfully.',
      })
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || 'Failed to update notification settings.'
      toast.error('Error', {
        description: errorMessage,
      })
    },
  }
)

const isUpdating = computed(() => updateNotificationsMutation.isLoading.value)

const saveNotificationSettings = () => {
  updateNotificationsMutation.mutate(notificationSettings.value)
}
</script>

<template>
  <!-- Settings Content -->
  <div class="md:col-span-3">
    <div class="bg-card rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Notification Preferences</h2>

      <form @submit.prevent="saveNotificationSettings">
        <div class="space-y-6">
          <!-- Email Notifications -->
          <div>
            <h3 class="text-lg font-medium mb-3">Email Notifications</h3>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <Label for="email-events" class="font-medium"
                    >Event Updates</Label
                  >
                  <p class="text-sm text-muted-foreground">
                    Receive notifications about events you're interested in
                  </p>
                </div>
                <Switch
                  id="email-events"
                  v-model="notificationSettings.email.events"
                />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <Label for="email-messages" class="font-medium"
                    >Messages</Label
                  >
                  <p class="text-sm text-muted-foreground">
                    Receive email notifications when you get new messages
                  </p>
                </div>
                <Switch
                  id="email-messages"
                  v-model="notificationSettings.email.messages"
                />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <Label for="email-community" class="font-medium"
                    >Community Updates</Label
                  >
                  <p class="text-sm text-muted-foreground">
                    Receive updates from communities you're a member of
                  </p>
                </div>
                <Switch
                  id="email-community"
                  v-model="notificationSettings.email.community"
                />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <Label for="email-marketing" class="font-medium"
                    >Marketing Emails</Label
                  >
                  <p class="text-sm text-muted-foreground">
                    Receive promotional emails and special offers
                  </p>
                </div>
                <Switch
                  id="email-marketing"
                  v-model="notificationSettings.email.marketing"
                />
              </div>
            </div>
          </div>

          <!-- Push Notifications -->
          <div class="pt-6 border-t">
            <h3 class="text-lg font-medium mb-3">Push Notifications</h3>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <Label for="push-events" class="font-medium"
                    >Event Reminders</Label
                  >
                  <p class="text-sm text-muted-foreground">
                    Receive reminders for upcoming events
                  </p>
                </div>
                <Switch
                  id="push-events"
                  v-model="notificationSettings.push.events"
                />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <Label for="push-messages" class="font-medium"
                    >New Messages</Label
                  >
                  <p class="text-sm text-muted-foreground">
                    Receive notifications for new messages
                  </p>
                </div>
                <Switch
                  id="push-messages"
                  v-model="notificationSettings.push.messages"
                />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <Label for="push-mentions" class="font-medium"
                    >Mentions</Label
                  >
                  <p class="text-sm text-muted-foreground">
                    Receive notifications when you're mentioned
                  </p>
                </div>
                <Switch
                  id="push-mentions"
                  v-model="notificationSettings.push.mentions"
                />
              </div>
            </div>
          </div>

          <!-- Notification Frequency -->
          <div class="pt-6 border-t">
            <h3 class="text-lg font-medium mb-3">Notification Frequency</h3>

            <div class="space-y-4">
              <div>
                <Label for="frequency" class="font-medium"
                  >Email Digest Frequency</Label
                >
                <Select v-model="notificationSettings.frequency">
                  <SelectTrigger id="frequency" class="w-full">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Digest</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <!-- Save Changes -->
          <div class="pt-6 border-t flex justify-end">
            <Button type="submit" class="flex items-center gap-2">
              <Icon
                v-if="isUpdating"
                name="heroicons:arrow-path"
                class="w-4 h-4 animate-spin"
              />
              <Icon v-else name="heroicons:check" class="w-4 h-4" />
              Save Preferences
            </Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
