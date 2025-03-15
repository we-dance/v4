<template>
  <!-- Profile Information Section -->
  <div class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:user" class="w-5 h-5" />
      Profile Information
    </h2>

    <form @submit.prevent="updateProfile" class="space-y-4">
      <!-- Profile Picture -->
      <div>
        <Label class="block mb-2">Profile Picture</Label>
        <div class="flex items-start gap-4">
          <div class="relative">
            <img
              :src="profileForm.avatarUrl || '/placeholder-avatar.jpg'"
              alt="Profile picture"
              class="w-24 h-24 rounded-full object-cover border-2 border-border"
            />
            <Button
              type="button"
              size="icon"
              variant="outline"
              class="absolute -bottom-2 -right-2 rounded-full w-8 h-8"
              @click="openFileUpload"
            >
              <Icon name="heroicons:pencil-square" class="w-4 h-4" />
            </Button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileUpload"
            />
          </div>
          <div class="text-sm text-muted-foreground">
            <p>Upload a profile picture (max 5MB)</p>
            <p>Supported formats: JPG, PNG, GIF</p>
          </div>
        </div>
      </div>

      <!-- Name -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label for="firstName" class="flex items-center gap-1">
            First Name
            <span class="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            v-model="profileForm.firstName"
            type="text"
            placeholder="Your first name"
            required
          />
        </div>
        <div>
          <Label for="lastName" class="flex items-center gap-1">
            Last Name
            <span class="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            v-model="profileForm.lastName"
            type="text"
            placeholder="Your last name"
            required
          />
        </div>
      </div>

      <!-- Username -->
      <div>
        <Label for="username" class="flex items-center gap-1">
          Username
          <span class="text-destructive">*</span>
        </Label>
        <div class="flex items-center gap-2">
          <Input
            id="username"
            v-model="profileForm.username"
            type="text"
            placeholder="Your username"
            required
            aria-describedby="username-description"
          />
          <div v-if="isCheckingUsername" class="animate-spin">
            <Icon name="heroicons:arrow-path" class="w-5 h-5" />
          </div>
        </div>
        <p id="username-description" class="text-sm text-muted-foreground mt-1">
          This will be your public username visible to other users
        </p>
      </div>

      <!-- Bio -->
      <div>
        <Label for="bio">Bio</Label>
        <Textarea
          id="bio"
          v-model="profileForm.bio"
          placeholder="Tell us about yourself"
          rows="4"
          aria-describedby="bio-description"
        />
        <p id="bio-description" class="text-sm text-muted-foreground mt-1">
          {{ profileForm.bio.length }}/200 characters
        </p>
      </div>

      <!-- Location -->
      <div>
        <Label for="location">Location</Label>
        <Input
          id="location"
          v-model="profileForm.location"
          type="text"
          placeholder="City, Country"
        />
      </div>

      <!-- Website -->
      <div>
        <Label for="website">Website</Label>
        <Input
          id="website"
          v-model="profileForm.website"
          type="url"
          placeholder="https://example.com"
        />
      </div>

      <!-- Save Profile Changes -->
      <div class="flex justify-end pt-4">
        <Button
          type="submit"
          :disabled="isUpdatingProfile"
          class="flex items-center gap-2"
        >
          <Icon
            v-if="isUpdatingProfile"
            name="heroicons:arrow-path"
            class="w-4 h-4 animate-spin"
          />
          <Icon v-else name="heroicons:check" class="w-4 h-4" />
          Save Profile
        </Button>
      </div>
    </form>
  </div>

  <!-- Social Links Section -->
  <div class="bg-card rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:link" class="w-5 h-5" />
      Social Links
    </h2>

    <form @submit.prevent="updateSocialLinks" class="space-y-4">
      <!-- Instagram -->
      <div>
        <Label for="instagram" class="flex items-center gap-2">
          <Icon name="simple-icons:instagram" class="w-4 h-4" />
          Instagram
        </Label>
        <div class="flex">
          <span
            class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground"
          >
            instagram.com/
          </span>
          <Input
            id="instagram"
            v-model="socialForm.instagram"
            type="text"
            placeholder="username"
            class="rounded-l-none"
          />
        </div>
      </div>

      <!-- Twitter -->
      <div>
        <Label for="twitter" class="flex items-center gap-2">
          <Icon name="simple-icons:x" class="w-4 h-4" />
          Twitter
        </Label>
        <div class="flex">
          <span
            class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground"
          >
            twitter.com/
          </span>
          <Input
            id="twitter"
            v-model="socialForm.twitter"
            type="text"
            placeholder="username"
            class="rounded-l-none"
          />
        </div>
      </div>

      <!-- Facebook -->
      <div>
        <Label for="facebook" class="flex items-center gap-2">
          <Icon name="simple-icons:facebook" class="w-4 h-4" />
          Facebook
        </Label>
        <div class="flex">
          <span
            class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground"
          >
            facebook.com/
          </span>
          <Input
            id="facebook"
            v-model="socialForm.facebook"
            type="text"
            placeholder="username"
            class="rounded-l-none"
          />
        </div>
      </div>

      <!-- LinkedIn -->
      <div>
        <Label for="linkedin" class="flex items-center gap-2">
          <Icon name="simple-icons:linkedin" class="w-4 h-4" />
          LinkedIn
        </Label>
        <div class="flex">
          <span
            class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground"
          >
            linkedin.com/in/
          </span>
          <Input
            id="linkedin"
            v-model="socialForm.linkedin"
            type="text"
            placeholder="username"
            class="rounded-l-none"
          />
        </div>
      </div>

      <!-- Save Social Links -->
      <div class="flex justify-end pt-4">
        <Button
          type="submit"
          :disabled="isUpdatingSocial"
          class="flex items-center gap-2"
        >
          <Icon
            v-if="isUpdatingSocial"
            name="heroicons:arrow-path"
            class="w-4 h-4 animate-spin"
          />
          <Icon v-else name="heroicons:check" class="w-4 h-4" />
          Save Social Links
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { useAuthStore } from '~/stores/auth'

// Define page metadata to use the settings layout
definePageMeta({
  layout: 'settings',
})

const authStore = useAuthStore()
const fileInput = ref<HTMLInputElement | null>(null)

// Form state
const profileForm = ref({
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  bio: '',
  location: '',
  website: '',
  avatarUrl: '',
})

const socialForm = ref({
  instagram: '',
  twitter: '',
  facebook: '',
  linkedin: '',
})

// UI state
const isUpdatingProfile = ref(false)
const isUpdatingSocial = ref(false)
const isCheckingUsername = ref(false)

// Methods
function openFileUpload() {
  fileInput.value?.click()
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files?.length) return

  const file = target.files[0]

  // Check file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    toast.error('File too large', {
      description: 'Please upload an image smaller than 5MB.',
    })
    return
  }

  // Create a preview URL
  const reader = new FileReader()
  reader.onload = (e) => {
    profileForm.value.avatarUrl = e.target?.result as string
  }
  reader.readAsDataURL(file)

  // TODO: Implement actual file upload to server
}

async function updateProfile() {
  isUpdatingProfile.value = true

  try {
    // Simulate username check
    isCheckingUsername.value = true
    await new Promise((resolve) => setTimeout(resolve, 500))
    isCheckingUsername.value = false

    // TODO: Implement actual API call to update profile
    await new Promise((resolve) => setTimeout(resolve, 800))

    toast.success('Profile updated', {
      description: 'Your profile information has been updated successfully.',
    })
  } catch (error) {
    toast.error('Error', {
      description: 'Failed to update profile information.',
    })
  } finally {
    isUpdatingProfile.value = false
  }
}

async function updateSocialLinks() {
  isUpdatingSocial.value = true

  try {
    // TODO: Implement actual API call to update social links
    await new Promise((resolve) => setTimeout(resolve, 800))

    toast.success('Social links updated', {
      description: 'Your social links have been updated successfully.',
    })
  } catch (error) {
    toast.error('Error', {
      description: 'Failed to update social links.',
    })
  } finally {
    isUpdatingSocial.value = false
  }
}
</script>
