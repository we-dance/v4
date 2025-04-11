<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useForm } from 'vee-validate'
import { useMutation } from 'vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import {
  notificationSettingsSchema,
  type NotificationSettings,
} from '~/schemas/user'

const { session } = useAppAuth()

const form = useForm({
  validationSchema: toTypedSchema(notificationSettingsSchema),
  initialValues: notificationSettingsSchema.safeParse(
    session.value?.user?.notificationSettings
  ).data,
})

const notificationSettings = computed(() => form.values as NotificationSettings)

const { $client } = useNuxtApp()

const updateNotificationsMutation = useMutation(
  async (values: NotificationSettings) => {
    if (!session.value) {
      throw new Error('User not authenticated')
    }

    return await $client.users.updateNotificationSettings.mutate({
      id: session.value.user.id,
      data: values,
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
  <div class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:bell" class="w-5 h-5" />
      Notification Settings
    </h2>

    <form @submit.prevent="saveNotificationSettings" class="space-y-8">
      <!-- Email Notifications Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Email Notifications</h3>
        <p class="text-sm text-muted-foreground mb-4">
          Choose which email notifications you'd like to receive
        </p>

        <div class="space-y-3">
          <FormField v-slot="{ value, handleChange }" name="email.events">
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel>Event updates</FormLabel>
                <FormDescription>
                  Receive notifications about events you're interested in
                </FormDescription>
              </div>
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="email.messages">
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel>Messages</FormLabel>
                <FormDescription>
                  Receive email notifications when someone messages you
                </FormDescription>
              </div>
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="email.community">
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel>Community updates</FormLabel>
                <FormDescription>
                  Stay informed about community activities and announcements
                </FormDescription>
              </div>
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="email.marketing">
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel>Marketing emails</FormLabel>
                <FormDescription>
                  Receive promotional content and special offers
                </FormDescription>
              </div>
            </FormItem>
          </FormField>
        </div>
      </div>

      <!-- Push Notifications Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Push Notifications</h3>
        <p class="text-sm text-muted-foreground mb-4">
          Configure push notifications for the WeDance app
        </p>

        <div class="space-y-3">
          <FormField v-slot="{ value, handleChange }" name="push.events">
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel>Event notifications</FormLabel>
                <FormDescription>
                  Get notified about event updates and reminders
                </FormDescription>
              </div>
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="push.messages">
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel>Message notifications</FormLabel>
                <FormDescription>
                  Get notified when you receive new messages
                </FormDescription>
              </div>
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="push.mentions">
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel>Mentions</FormLabel>
                <FormDescription>
                  Get notified when someone mentions you in a post or comment
                </FormDescription>
              </div>
            </FormItem>
          </FormField>
        </div>
      </div>

      <!-- Notification Frequency Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Notification Frequency</h3>
        <p class="text-sm text-muted-foreground mb-4">
          Choose how often you want to receive notifications
        </p>

        <FormField v-slot="{ componentField }" name="frequency">
          <FormItem class="space-y-3">
            <FormControl>
              <RadioGroup v-bind="componentField" class="space-y-2">
                <FormItem class="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="immediately" />
                  </FormControl>
                  <FormLabel class="font-normal">Immediately</FormLabel>
                </FormItem>
                <FormItem class="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="daily" />
                  </FormControl>
                  <FormLabel class="font-normal">Daily digest</FormLabel>
                </FormItem>
                <FormItem class="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="weekly" />
                  </FormControl>
                  <FormLabel class="font-normal">Weekly digest</FormLabel>
                </FormItem>
                <FormItem class="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="never" />
                  </FormControl>
                  <FormLabel class="font-normal">Never</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <Button type="submit" :disabled="isUpdating">
          <Icon
            v-if="isUpdating"
            name="heroicons:arrow-path"
            class="w-4 h-4 mr-2 animate-spin"
          />
          {{ isUpdating ? 'Saving...' : 'Save Changes' }}
        </Button>
      </div>
    </form>
  </div>
</template>
