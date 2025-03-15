<script setup lang="ts">
import { toast } from 'vue-sonner'

const props = defineProps<{
  initialEmail: string
}>()

// Form state
const accountForm = ref({
  email: props.initialEmail || '',
})

// UI state
const isUpdatingAccount = ref(false)

// Methods
async function updateAccount() {
  if (!accountForm.value.email) return

  isUpdatingAccount.value = true

  try {
    // TODO: Replace with actual API call
    await $fetch('/api/user/update', {
      method: 'PUT',
      body: {
        email: accountForm.value.email,
      },
    }).catch(() => {
      // This is just for development, remove in production
      return new Promise((resolve) => setTimeout(resolve, 800))
    })

    toast.success('Account updated', {
      description: 'Your account information has been updated successfully.',
    })
  } catch (error: any) {
    const errorMessage =
      error?.data?.message || 'Failed to update account information.'
    toast.error('Error', {
      description: errorMessage,
    })
  } finally {
    isUpdatingAccount.value = false
  }
}
</script>

<template>
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
</template>
