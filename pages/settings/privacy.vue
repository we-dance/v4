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
          <h2 class="text-xl font-semibold mb-4">Privacy Settings</h2>

          <form @submit.prevent="savePrivacySettings">
            <div class="space-y-6">
              <!-- Profile Visibility -->
              <div>
                <h3 class="text-lg font-medium mb-3">Profile Visibility</h3>

                <div class="space-y-4">
                  <div>
                    <Label for="profile-visibility" class="font-medium"
                      >Who can see your profile?</Label
                    >
                    <Select v-model="privacySettings.profileVisibility">
                      <SelectTrigger id="profile-visibility" class="w-full">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public"
                          >Everyone (Public)</SelectItem
                        >
                        <SelectItem value="connections"
                          >Only Connections</SelectItem
                        >
                        <SelectItem value="private"
                          >Only Me (Private)</SelectItem
                        >
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <!-- Contact Preferences -->
              <div class="pt-6 border-t">
                <h3 class="text-lg font-medium mb-3">Contact Preferences</h3>

                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <Label for="allow-messages" class="font-medium"
                        >Allow Messages</Label
                      >
                      <p class="text-sm text-muted-foreground">
                        Allow other users to send you direct messages
                      </p>
                    </div>
                    <Switch
                      id="allow-messages"
                      v-model="privacySettings.contactPreferences.allowMessages"
                    />
                  </div>

                  <div class="flex items-center justify-between">
                    <div>
                      <Label for="show-email" class="font-medium"
                        >Show Email</Label
                      >
                      <p class="text-sm text-muted-foreground">
                        Make your email visible to other users
                      </p>
                    </div>
                    <Switch
                      id="show-email"
                      v-model="privacySettings.contactPreferences.showEmail"
                    />
                  </div>

                  <div class="flex items-center justify-between">
                    <div>
                      <Label for="show-phone" class="font-medium"
                        >Show Phone Number</Label
                      >
                      <p class="text-sm text-muted-foreground">
                        Make your phone number visible to other users
                      </p>
                    </div>
                    <Switch
                      id="show-phone"
                      v-model="privacySettings.contactPreferences.showPhone"
                    />
                  </div>
                </div>
              </div>

              <!-- Activity Visibility -->
              <div class="pt-6 border-t">
                <h3 class="text-lg font-medium mb-3">Activity Visibility</h3>

                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <Label for="show-online-status" class="font-medium"
                        >Online Status</Label
                      >
                      <p class="text-sm text-muted-foreground">
                        Show when you're active on the platform
                      </p>
                    </div>
                    <Switch
                      id="show-online-status"
                      v-model="
                        privacySettings.activityVisibility.showOnlineStatus
                      "
                    />
                  </div>

                  <div class="flex items-center justify-between">
                    <div>
                      <Label for="show-event-attendance" class="font-medium"
                        >Event Attendance</Label
                      >
                      <p class="text-sm text-muted-foreground">
                        Show which events you're attending
                      </p>
                    </div>
                    <Switch
                      id="show-event-attendance"
                      v-model="
                        privacySettings.activityVisibility.showEventAttendance
                      "
                    />
                  </div>
                </div>
              </div>

              <!-- Data Usage -->
              <div class="pt-6 border-t">
                <h3 class="text-lg font-medium mb-3">Data Usage</h3>

                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <Label for="allow-data-analytics" class="font-medium"
                        >Analytics</Label
                      >
                      <p class="text-sm text-muted-foreground">
                        Allow us to collect anonymous usage data to improve the
                        platform
                      </p>
                    </div>
                    <Switch
                      id="allow-data-analytics"
                      v-model="privacySettings.dataUsage.allowAnalytics"
                    />
                  </div>

                  <div class="flex items-center justify-between">
                    <div>
                      <Label for="allow-personalization" class="font-medium"
                        >Personalization</Label
                      >
                      <p class="text-sm text-muted-foreground">
                        Allow us to personalize your experience based on your
                        activity
                      </p>
                    </div>
                    <Switch
                      id="allow-personalization"
                      v-model="privacySettings.dataUsage.allowPersonalization"
                    />
                  </div>
                </div>
              </div>

              <!-- Save Changes -->
              <div class="pt-6 border-t flex justify-end">
                <Button type="submit"> Save Privacy Settings </Button>
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

// Privacy settings state
const privacySettings = ref({
  profileVisibility: 'public',
  contactPreferences: {
    allowMessages: true,
    showEmail: false,
    showPhone: false,
  },
  activityVisibility: {
    showOnlineStatus: true,
    showEventAttendance: true,
  },
  dataUsage: {
    allowAnalytics: true,
    allowPersonalization: true,
  },
})

// Methods
async function savePrivacySettings() {
  try {
    // TODO: Implement actual API call to save privacy settings
    toast.success('Privacy settings saved', {
      description: 'Your privacy settings have been updated.',
    })
  } catch (error) {
    toast.error('Error', {
      description: 'Failed to save privacy settings.',
    })
  }
}
</script>
