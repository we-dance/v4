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
          <h2 class="text-xl font-semibold mb-4">Profile Information</h2>

          <form @submit.prevent="saveProfile">
            <div class="space-y-6">
              <!-- Profile Photo -->
              <div>
                <Label class="font-medium mb-2 block">Profile Photo</Label>
                <div class="flex items-center gap-4">
                  <div
                    class="relative h-24 w-24 rounded-full overflow-hidden bg-muted"
                  >
                    <img
                      v-if="profileForm.avatarUrl"
                      :src="profileForm.avatarUrl"
                      alt="Profile photo"
                      class="h-full w-full object-cover"
                    />
                    <div
                      v-else
                      class="h-full w-full flex items-center justify-center text-muted-foreground"
                    >
                      <span class="text-3xl">{{
                        getInitials(profileForm.name)
                      }}</span>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <Button type="button" variant="outline" size="sm">
                      Upload Photo
                    </Button>
                    <Button
                      v-if="profileForm.avatarUrl"
                      type="button"
                      variant="ghost"
                      size="sm"
                      @click="profileForm.avatarUrl = ''"
                    >
                      Remove Photo
                    </Button>
                  </div>
                </div>
              </div>

              <!-- Basic Information -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label for="name">Full Name</Label>
                  <Input
                    id="name"
                    v-model="profileForm.name"
                    placeholder="Your full name"
                    class="w-full"
                  />
                </div>

                <div>
                  <Label for="username">Username</Label>
                  <Input
                    id="username"
                    v-model="profileForm.username"
                    placeholder="Your username"
                    class="w-full"
                  />
                </div>

                <div>
                  <Label for="location">Location</Label>
                  <Input
                    id="location"
                    v-model="profileForm.location"
                    placeholder="Your location"
                    class="w-full"
                  />
                </div>

                <div>
                  <Label for="timezone">Timezone</Label>
                  <Select v-model="profileForm.timezone">
                    <SelectTrigger id="timezone" class="w-full">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York"
                        >Eastern Time (ET)</SelectItem
                      >
                      <SelectItem value="America/Chicago"
                        >Central Time (CT)</SelectItem
                      >
                      <SelectItem value="America/Denver"
                        >Mountain Time (MT)</SelectItem
                      >
                      <SelectItem value="America/Los_Angeles"
                        >Pacific Time (PT)</SelectItem
                      >
                      <SelectItem value="Europe/London"
                        >London (GMT)</SelectItem
                      >
                      <SelectItem value="Europe/Paris"
                        >Central European Time (CET)</SelectItem
                      >
                      <SelectItem value="Asia/Tokyo"
                        >Japan Standard Time (JST)</SelectItem
                      >
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <!-- Bio -->
              <div>
                <Label for="bio">Bio</Label>
                <Textarea
                  id="bio"
                  v-model="profileForm.bio"
                  placeholder="Tell us about yourself"
                  class="w-full min-h-[120px]"
                />
              </div>

              <!-- Dance Information -->
              <div class="pt-6 border-t">
                <h3 class="text-lg font-medium mb-3">Dance Information</h3>

                <div class="space-y-4">
                  <div>
                    <Label for="dance-level">Experience Level</Label>
                    <Select v-model="profileForm.level">
                      <SelectTrigger id="dance-level" class="w-full">
                        <SelectValue
                          placeholder="Select your experience level"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate"
                          >Intermediate</SelectItem
                        >
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="master">Master</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label for="dance-styles">Dance Styles</Label>
                    <div class="flex flex-wrap gap-2 mt-2">
                      <div
                        v-for="style in availableDanceStyles"
                        :key="style"
                        @click="toggleDanceStyle(style)"
                        class="px-3 py-1 rounded-full text-sm cursor-pointer transition-colors"
                        :class="
                          profileForm.styles.includes(style)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        "
                      >
                        {{ style }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div class="pt-6 border-t">
                <h3 class="text-lg font-medium mb-3">Social Links</h3>

                <div class="space-y-4">
                  <div
                    v-for="(link, index) in profileForm.socialLinks"
                    :key="index"
                    class="flex gap-2"
                  >
                    <Select v-model="link.platform" class="w-1/3">
                      <SelectTrigger>
                        <SelectValue placeholder="Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      v-model="link.url"
                      placeholder="URL"
                      class="flex-1"
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      @click="removeSocialLink(index)"
                    >
                      <span class="sr-only">Remove</span>
                      <span class="text-lg">×</span>
                    </Button>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    @click="addSocialLink"
                  >
                    Add Social Link
                  </Button>
                </div>
              </div>

              <!-- Save Changes -->
              <div class="pt-6 border-t flex justify-end">
                <Button type="submit"> Save Profile </Button>
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
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

// Available dance styles
const availableDanceStyles = [
  'Salsa',
  'Bachata',
  'Kizomba',
  'Tango',
  'Swing',
  'Hip Hop',
  'Ballet',
  'Contemporary',
  'Ballroom',
  'Breakdance',
  'Zouk',
]

// Profile form state
const profileForm = ref({
  name: authStore.user?.name || '',
  username: '',
  avatarUrl: '',
  location: '',
  timezone: '',
  bio: '',
  level: 'beginner',
  styles: [] as string[],
  socialLinks: [] as Array<{ platform: string; url: string }>,
})

// Methods
function getInitials(name: string): string {
  if (!name) return ''
  return name
    .split(' ')
    .map((part: string) => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

function toggleDanceStyle(style: string): void {
  const index = profileForm.value.styles.indexOf(style)
  if (index === -1) {
    profileForm.value.styles.push(style)
  } else {
    profileForm.value.styles.splice(index, 1)
  }
}

function addSocialLink(): void {
  profileForm.value.socialLinks.push({
    platform: '',
    url: '',
  })
}

function removeSocialLink(index: number): void {
  profileForm.value.socialLinks.splice(index, 1)
}

async function saveProfile(): Promise<void> {
  try {
    // TODO: Implement actual API call to save profile
    toast.success('Profile saved', {
      description: 'Your profile has been updated successfully.',
    })
  } catch (error) {
    toast.error('Error', {
      description: 'Failed to update profile.',
    })
  }
}
</script>
