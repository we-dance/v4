<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'

const schema = z.object({
  emailNotifications: z.object({
    events: z.boolean(),
    messages: z.boolean(),
    updates: z.boolean(),
    marketing: z.boolean()
  }),
  pushNotifications: z.object({
    events: z.boolean(),
    messages: z.boolean(),
    updates: z.boolean()
  }),
  notificationTypes: z.object({
    eventReminders: z.boolean(),
    newMessages: z.boolean(),
    friendRequests: z.boolean(),
    mentions: z.boolean(),
    comments: z.boolean(),
    likes: z.boolean()
  })
})

const form = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    emailNotifications: {
      events: true,
      messages: true,
      updates: true,
      marketing: false
    },
    pushNotifications: {
      events: true,
      messages: true,
      updates: false
    },
    notificationTypes: {
      eventReminders: true,
      newMessages: true,
      friendRequests: true,
      mentions: true,
      comments: true,
      likes: true
    }
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    // TODO: Implement API call to update notification settings
    toast.success('Notification settings updated successfully')
  } catch (error) {
    toast.error('Failed to update notification settings')
  }
})
</script>

<template>
  <div class="container py-16 max-w-4xl">
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Notification Settings</h1>
        <p class="text-muted-foreground mt-2">
          Customize how you receive notifications
        </p>
      </div>

      <form @submit="onSubmit" class="space-y-8">
        <div class="grid gap-6">
          <!-- Email Notifications -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Email Notifications</h2>
            <FormField
              v-slot="{ value, handleChange }"
              name="emailNotifications.events"
            >
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Event Updates</FormLabel>
                  <FormDescription>
                    Receive emails about events you're interested in
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ value, handleChange }"
              name="emailNotifications.messages"
            >
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Messages</FormLabel>
                  <FormDescription>
                    Receive email notifications for new messages
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ value, handleChange }"
              name="emailNotifications.updates"
            >
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Platform Updates</FormLabel>
                  <FormDescription>
                    Receive important updates about WeDance
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ value, handleChange }"
              name="emailNotifications.marketing"
            >
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Marketing Emails</FormLabel>
                  <FormDescription>
                    Receive promotional emails and newsletters
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>
          </div>

          <!-- Push Notifications -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Push Notifications</h2>
            <FormField
              v-slot="{ value, handleChange }"
              name="pushNotifications.events"
            >
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Event Alerts</FormLabel>
                  <FormDescription>
                    Receive push notifications for event updates
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ value, handleChange }"
              name="pushNotifications.messages"
            >
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Message Alerts</FormLabel>
                  <FormDescription>
                    Receive push notifications for new messages
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ value, handleChange }"
              name="pushNotifications.updates"
            >
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Platform Updates</FormLabel>
                  <FormDescription>
                    Receive push notifications for important updates
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>
          </div>

          <!-- Notification Types -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Notification Types</h2>
            <FormField
              v-slot="{ value, handleChange }"
              name="notificationTypes.eventReminders"
            >
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Event Reminders</FormLabel>
                  <FormDescription>
                    Get reminded about upcoming events
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ value, handleChange }"
              name="notificationTypes.newMessages"
            >
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>New Messages</FormLabel>
                  <FormDescription>
                    Get notified when you receive new messages
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ value, handleChange }"
              name="notificationTypes.friendRequests"
            >
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Friend Requests</FormLabel>
                  <FormDescription>
                    Get notified about new connection requests
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ value, handleChange }"
              name="notificationTypes.mentions"
            >
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Mentions</FormLabel>
                  <FormDescription>
                    Get notified when someone mentions you
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ value, handleChange }"
              name="notificationTypes.comments"
            >
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Comments</FormLabel>
                  <FormDescription>
                    Get notified about comments on your posts
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ value, handleChange }"
              name="notificationTypes.likes"
            >
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Likes</FormLabel>
                  <FormDescription>
                    Get notified when someone likes your content
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>
          </div>
        </div>

        <div class="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  </div>
</template> 