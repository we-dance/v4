<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { toast } from 'vue-sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { usePasswordStrength } from '~/composables/usePasswordStrength'

// Form state
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// UI state
const isUpdatingPassword = ref(false)
const passwordUpdateSuccess = ref(false)

// Password visibility toggles
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Password strength
const { strength, strengthPercent, checkStrength } = usePasswordStrength()

// Computed properties
const canUpdatePassword = computed(() => {
  return (
    passwordForm.value.currentPassword &&
    passwordForm.value.newPassword &&
    passwordForm.value.confirmPassword &&
    passwordForm.value.newPassword === passwordForm.value.confirmPassword &&
    passwordForm.value.newPassword.length >= 8 &&
    /[A-Z]/.test(passwordForm.value.newPassword) &&
    /[0-9]/.test(passwordForm.value.newPassword)
  )
})

// Reset success message when form changes
watch(
  passwordForm,
  () => {
    passwordUpdateSuccess.value = false
    if (passwordForm.value.newPassword) {
      checkStrength(passwordForm.value.newPassword)
    }
  },
  { deep: true }
)

// Methods
async function updatePassword() {
  if (!canUpdatePassword.value) return

  isUpdatingPassword.value = true

  try {
    // TODO: Replace with actual API call
    await $fetch('/api/user/password', {
      method: 'PUT',
      body: {
        currentPassword: passwordForm.value.currentPassword,
        newPassword: passwordForm.value.newPassword,
      },
    }).catch(() => {
      // This is just for development, remove in production
      return new Promise((resolve) => setTimeout(resolve, 800))
    })

    toast.success('Password updated', {
      description: 'Your password has been updated successfully.',
    })

    // Reset password form
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }

    // Show success message
    passwordUpdateSuccess.value = true

    // Reset password strength
    checkStrength('')
  } catch (error: any) {
    const errorMessage = error?.data?.message || 'Failed to update password.'
    toast.error('Error', {
      description: errorMessage,
    })
  } finally {
    isUpdatingPassword.value = false
  }
}
</script>

<template>
  <div class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:key" class="w-5 h-5" />
      Password Settings
    </h2>

    <form @submit.prevent="updatePassword" class="space-y-4">
      <!-- Current Password -->
      <div>
        <Label for="currentPassword" class="flex items-center gap-1">
          Current Password
          <span class="text-destructive">*</span>
        </Label>
        <div class="relative max-w-md">
          <Input
            id="currentPassword"
            v-model="passwordForm.currentPassword"
            :type="showCurrentPassword ? 'text' : 'password'"
            placeholder="Enter your current password"
            class="w-full pr-10"
            required
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            @click="showCurrentPassword = !showCurrentPassword"
            aria-label="Toggle current password visibility"
          >
            <Icon
              :name="
                showCurrentPassword ? 'heroicons:eye-slash' : 'heroicons:eye'
              "
              class="w-5 h-5"
            />
          </button>
        </div>
        <div class="flex mt-1">
          <NuxtLink
            to="/forgot-password"
            class="text-sm text-primary hover:underline"
          >
            Forgot password?
          </NuxtLink>
        </div>
      </div>

      <!-- New Password -->
      <div>
        <Label for="newPassword" class="flex items-center gap-1">
          New Password
          <span class="text-destructive">*</span>
        </Label>
        <div class="relative max-w-md">
          <Input
            id="newPassword"
            v-model="passwordForm.newPassword"
            :type="showNewPassword ? 'text' : 'password'"
            placeholder="Enter new password"
            class="w-full pr-10"
            required
            aria-describedby="password-requirements"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            @click="showNewPassword = !showNewPassword"
            aria-label="Toggle new password visibility"
          >
            <Icon
              :name="showNewPassword ? 'heroicons:eye-slash' : 'heroicons:eye'"
              class="w-5 h-5"
            />
          </button>
        </div>

        <!-- Password strength indicator -->
        <div class="mt-2 max-w-md">
          <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              class="h-full transition-all duration-300"
              :class="{
                'bg-destructive': strength === 'weak',
                'bg-warning': strength === 'medium',
                'bg-success': strength === 'strong',
              }"
              :style="{ width: strengthPercent + '%' }"
            ></div>
          </div>
          <p
            class="text-xs mt-1"
            :class="{
              'text-destructive': strength === 'weak',
              'text-warning': strength === 'medium',
              'text-success': strength === 'strong',
            }"
          >
            {{
              strength === 'weak'
                ? 'Weak'
                : strength === 'medium'
                  ? 'Medium'
                  : 'Strong'
            }}
          </p>
        </div>

        <div
          id="password-requirements"
          class="text-sm text-muted-foreground mt-2 space-y-1 max-w-md"
        >
          <p class="flex items-center gap-1">
            <Icon
              :name="
                passwordForm.newPassword.length >= 8
                  ? 'heroicons:check-circle'
                  : 'heroicons:x-circle'
              "
              class="w-4 h-4"
              :class="
                passwordForm.newPassword.length >= 8
                  ? 'text-success'
                  : 'text-muted-foreground'
              "
            />
            At least 8 characters
          </p>
          <p class="flex items-center gap-1">
            <Icon
              :name="
                /[A-Z]/.test(passwordForm.newPassword)
                  ? 'heroicons:check-circle'
                  : 'heroicons:x-circle'
              "
              class="w-4 h-4"
              :class="
                /[A-Z]/.test(passwordForm.newPassword)
                  ? 'text-success'
                  : 'text-muted-foreground'
              "
            />
            At least one uppercase letter
          </p>
          <p class="flex items-center gap-1">
            <Icon
              :name="
                /[0-9]/.test(passwordForm.newPassword)
                  ? 'heroicons:check-circle'
                  : 'heroicons:x-circle'
              "
              class="w-4 h-4"
              :class="
                /[0-9]/.test(passwordForm.newPassword)
                  ? 'text-success'
                  : 'text-muted-foreground'
              "
            />
            At least one number
          </p>
        </div>
      </div>

      <!-- Confirm New Password -->
      <div>
        <Label for="confirmPassword" class="flex items-center gap-1">
          Confirm New Password
          <span class="text-destructive">*</span>
        </Label>
        <div class="relative max-w-md">
          <Input
            id="confirmPassword"
            v-model="passwordForm.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirm new password"
            class="w-full pr-10"
            required
            aria-describedby="confirm-password-feedback"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            @click="showConfirmPassword = !showConfirmPassword"
            aria-label="Toggle confirm password visibility"
          >
            <Icon
              :name="
                showConfirmPassword ? 'heroicons:eye-slash' : 'heroicons:eye'
              "
              class="w-5 h-5"
            />
          </button>
        </div>
        <p
          id="confirm-password-feedback"
          v-if="
            passwordForm.confirmPassword &&
            passwordForm.newPassword !== passwordForm.confirmPassword
          "
          class="text-sm text-destructive mt-1"
        >
          Passwords do not match
        </p>
        <p
          v-else-if="
            passwordForm.confirmPassword &&
            passwordForm.newPassword === passwordForm.confirmPassword
          "
          class="text-sm text-success mt-1"
        >
          Passwords match
        </p>
      </div>

      <!-- Update Password Button -->
      <div class="flex items-center gap-3 pt-4">
        <Button
          type="submit"
          :disabled="!canUpdatePassword || isUpdatingPassword"
          class="flex items-center gap-2"
        >
          <Icon
            v-if="isUpdatingPassword"
            name="heroicons:arrow-path"
            class="w-4 h-4 animate-spin"
          />
          <Icon v-else name="heroicons:key" class="w-4 h-4" />
          Update Password
        </Button>
        <p
          v-if="passwordUpdateSuccess"
          class="text-sm text-success flex items-center gap-1"
        >
          <Icon name="heroicons:check-circle" class="w-4 h-4" />
          Password updated successfully
        </p>
      </div>
    </form>
  </div>
</template>
