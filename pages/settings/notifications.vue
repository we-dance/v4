<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold mb-6">Account Settings</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Settings Navigation -->
      <div class="md:col-span-1">
        <div class="bg-card rounded-lg shadow p-4">
          <nav class="space-y-2">
            <NuxtLink
              to="/settings"
              class="block px-3 py-2 rounded-md transition-colors"
              :class="{
                'bg-primary text-primary-foreground':
                  route.path === '/settings',
              }"
            >
              Account
            </NuxtLink>
            <NuxtLink
              to="/settings/profile"
              class="block px-3 py-2 rounded-md transition-colors"
              :class="{
                'bg-primary text-primary-foreground':
                  route.path === '/settings/profile',
              }"
            >
              Profile
            </NuxtLink>
            <NuxtLink
              to="/settings/notifications"
              class="block px-3 py-2 rounded-md transition-colors"
              :class="{
                'bg-primary text-primary-foreground':
                  route.path === '/settings/notifications',
              }"
            >
              Notifications
            </NuxtLink>
            <NuxtLink
              to="/settings/privacy"
              class="block px-3 py-2 rounded-md transition-colors"
              :class="{
                'bg-primary text-primary-foreground':
                  route.path === '/settings/privacy',
              }"
            >
              Privacy
            </NuxtLink>
          </nav>
        </div>
      </div>

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
                <Button type="submit"> Save Preferences </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

const route = useRoute()

// Notification settings state
const notificationSettings = ref({
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
})

// Methods
async function saveNotificationSettings() {
  try {
    // TODO: Implement actual API call to save notification settings
    toast.success('Preferences saved', {
      description: 'Your notification preferences have been updated.',
    })
  } catch (error) {
    toast.error('Error', {
      description: 'Failed to save notification preferences.',
    })
  }
}
</script>
