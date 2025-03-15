<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { useAuthStore } from '~/stores/auth'

// Define page metadata to use the settings layout
definePageMeta({
  layout: 'settings',
})

const route = useRoute()
const authStore = useAuthStore()

// Form state
const accountForm = ref({
  email: authStore.user?.email || '',
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// UI state
const isDeleteDialogOpen = ref(false)
const deleteConfirmation = ref('')
const isUpdatingAccount = ref(false)
const isUpdatingPassword = ref(false)
const isDeletingAccount = ref(false)
const passwordUpdateSuccess = ref(false)
const passwordStrength = ref('weak')
const passwordStrengthPercent = ref(0)

// Password visibility toggles
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

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

// Password strength checker
function checkPasswordStrength() {
  const password = passwordForm.value.newPassword

  if (!password) {
    passwordStrength.value = 'weak'
    passwordStrengthPercent.value = 0
    return
  }

  let strength = 0

  // Length check
  if (password.length >= 8) strength += 1
  if (password.length >= 12) strength += 1

  // Character type checks
  if (/[A-Z]/.test(password)) strength += 1
  if (/[a-z]/.test(password)) strength += 1
  if (/[0-9]/.test(password)) strength += 1
  if (/[^A-Za-z0-9]/.test(password)) strength += 1

  // Set strength level
  if (strength <= 2) {
    passwordStrength.value = 'weak'
    passwordStrengthPercent.value = 33
  } else if (strength <= 4) {
    passwordStrength.value = 'medium'
    passwordStrengthPercent.value = 66
  } else {
    passwordStrength.value = 'strong'
    passwordStrengthPercent.value = 100
  }
}

// Reset success message when form changes
watch(
  passwordForm,
  () => {
    passwordUpdateSuccess.value = false
  },
  { deep: true }
)

// Methods
async function updateAccount() {
  if (!accountForm.value.email) return

  isUpdatingAccount.value = true

  try {
    // TODO: Implement actual API call to update account
    await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate API call

    toast.success('Account updated', {
      description: 'Your account information has been updated successfully.',
    })
  } catch (error) {
    toast.error('Error', {
      description: 'Failed to update account information.',
    })
  } finally {
    isUpdatingAccount.value = false
  }
}

async function updatePassword() {
  if (!canUpdatePassword.value) return

  isUpdatingPassword.value = true

  try {
    // TODO: Implement actual API call to update password
    await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate API call

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
    passwordStrength.value = 'weak'
    passwordStrengthPercent.value = 0
  } catch (error) {
    toast.error('Error', {
      description: 'Failed to update password.',
    })
  } finally {
    isUpdatingPassword.value = false
  }
}

function confirmDeleteAccount() {
  isDeleteDialogOpen.value = true
}

async function deleteAccount() {
  if (deleteConfirmation.value !== 'delete my account') return

  isDeletingAccount.value = true

  try {
    // TODO: Implement actual API call to delete account
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

    toast.success('Account deleted', {
      description: 'Your account has been deleted successfully.',
    })

    // Logout and redirect to home page
    authStore.logout()
    navigateTo('/')
  } catch (error) {
    toast.error('Error', {
      description: 'Failed to delete account.',
    })
  } finally {
    isDeleteDialogOpen.value = false
    deleteConfirmation.value = ''
    isDeletingAccount.value = false
  }
}
</script>

<template>
  <!-- Account Information Section -->
  <div class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:envelope" class="w-5 h-5" />
      Account Information
    </h2>

    <form @submit.prevent="updateAccount" class="space-y-4">
      <!-- Email -->
      <div>
        <Label for="email" class="flex items-center gap-1">
          Email
          <span class="text-destructive">*</span>
        </Label>
        <div class="flex items-center gap-2">
          <Input
            id="email"
            v-model="accountForm.email"
            type="email"
            placeholder="Your email address"
            class="max-w-md"
            required
            aria-describedby="email-description"
          />
          <div v-if="isUpdatingAccount" class="animate-spin">
            <Icon name="heroicons:arrow-path" class="w-5 h-5" />
          </div>
        </div>
        <p id="email-description" class="text-sm text-muted-foreground mt-1">
          This email is used for account notifications and recovery
        </p>
      </div>

      <!-- Save Account Changes -->
      <div class="flex justify-end pt-4">
        <Button
          type="submit"
          :disabled="!accountForm.email || isUpdatingAccount"
          class="flex items-center gap-2"
        >
          <Icon name="heroicons:check" class="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </form>
  </div>

  <!-- Password Section -->
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
            aria-label="Toggle password visibility"
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
            @input="checkPasswordStrength"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            @click="showNewPassword = !showNewPassword"
            aria-label="Toggle password visibility"
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
                'bg-destructive': passwordStrength === 'weak',
                'bg-warning': passwordStrength === 'medium',
                'bg-success': passwordStrength === 'strong',
              }"
              :style="{ width: passwordStrengthPercent + '%' }"
            ></div>
          </div>
          <p
            class="text-xs mt-1"
            :class="{
              'text-destructive': passwordStrength === 'weak',
              'text-warning': passwordStrength === 'medium',
              'text-success': passwordStrength === 'strong',
            }"
          >
            {{
              passwordStrength === 'weak'
                ? 'Weak'
                : passwordStrength === 'medium'
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
            aria-label="Toggle password visibility"
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

  <!-- Delete Account Section -->
  <div class="bg-card rounded-lg border border-destructive/20 shadow p-6">
    <h2
      class="text-xl font-semibold mb-4 text-destructive flex items-center gap-2"
    >
      <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
      Danger Zone
    </h2>

    <div class="rounded-md bg-destructive/5 p-4 mb-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <Icon
            name="heroicons:exclamation-circle"
            class="h-5 w-5 text-destructive"
            aria-hidden="true"
          />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-destructive">
            Account Deletion Warning
          </h3>
          <div class="mt-2 text-sm text-destructive/80">
            <p>
              Deleting your account will permanently remove all your data,
              including profile information, connections, and activity history.
              This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
    </div>

    <Button
      type="button"
      variant="destructive"
      @click="confirmDeleteAccount"
      class="flex items-center gap-2"
    >
      <Icon name="heroicons:trash" class="w-4 h-4" />
      Delete Account
    </Button>
  </div>

  <!-- Delete Account Confirmation Dialog -->
  <Dialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2 text-destructive">
          <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
          Delete Account
        </DialogTitle>
        <DialogDescription>
          Are you sure you want to delete your account? This action cannot be
          undone and will immediately log you out of all devices.
        </DialogDescription>
      </DialogHeader>

      <div class="py-4">
        <p class="mb-4">
          Please type <strong>delete my account</strong> to confirm:
        </p>
        <Input
          v-model="deleteConfirmation"
          placeholder="delete my account"
          class="w-full"
          aria-label="Confirmation text"
        />
        <p class="text-sm text-muted-foreground mt-2">
          This will delete all your data including profile information,
          connections, and activity history.
        </p>
      </div>

      <DialogFooter>
        <div class="flex items-center gap-3">
          <Button variant="outline" @click="isDeleteDialogOpen = false">
            Cancel
          </Button>
          <Button
            variant="destructive"
            @click="deleteAccount"
            :disabled="
              deleteConfirmation !== 'delete my account' || isDeletingAccount
            "
            class="flex items-center gap-2"
          >
            <Icon
              v-if="isDeletingAccount"
              name="heroicons:arrow-path"
              class="w-4 h-4 animate-spin"
            />
            <Icon v-else name="heroicons:trash" class="w-4 h-4" />
            Delete Account
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
