<script setup lang="ts">
import { ref, computed } from 'vue'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { passwordSchema } from '~/schemas/user'

// Setup form with validation
const form = useForm({
  validationSchema: toTypedSchema(passwordSchema),
  initialValues: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
})

const passwordUpdateSuccess = ref(false)

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const { $client } = useNuxtApp()

const updatePasswordMutation = useMutation({
  mutationFn: async (values: {
    currentPassword: string
    newPassword: string
  }) => {
    return await $client.users.updatePassword.mutate({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    })
  },
  onSuccess: () => {
    toast.success('Password updated', {
      description: 'Your password has been updated successfully.',
    })

    // Reset form
    form.resetForm()

    // Show success message
    passwordUpdateSuccess.value = true

    // Hide success message after 5 seconds
    setTimeout(() => {
      passwordUpdateSuccess.value = false
    }, 5000)
  },
  onError: (error: any) => {
    const errorMessage = error?.message || 'Failed to update password.'
    toast.error('Error', {
      description: errorMessage,
    })
  },
})

const isUpdatingPassword = computed(
  () => updatePasswordMutation.isPending.value
)

const canSubmit = computed(() => {
  return (
    form.meta.value.valid && form.meta.value.dirty && !isUpdatingPassword.value
  )
})

const onSubmit = form.handleSubmit(async (values) => {
  updatePasswordMutation.mutate({
    currentPassword: values.currentPassword,
    newPassword: values.newPassword,
  })
})
</script>

<template>
  <div class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:key" class="w-5 h-5" />
      Password Settings
    </h2>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- Current Password -->
      <FormField v-slot="{ componentField }" name="currentPassword">
        <FormItem>
          <FormLabel class="flex items-center gap-1">
            Current Password
            <span class="text-destructive">*</span>
          </FormLabel>
          <div class="relative max-w-md">
            <FormControl>
              <Input
                v-bind="componentField"
                :type="showCurrentPassword ? 'text' : 'password'"
                placeholder="Enter your current password"
                class="w-full pr-10"
              />
            </FormControl>
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
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- New Password -->
      <FormField v-slot="{ componentField }" name="newPassword">
        <FormItem>
          <FormLabel class="flex items-center gap-1">
            New Password
            <span class="text-destructive">*</span>
          </FormLabel>
          <div class="relative max-w-md">
            <FormControl>
              <Input
                v-bind="componentField"
                :type="showNewPassword ? 'text' : 'password'"
                placeholder="Enter new password"
                class="w-full pr-10"
                aria-describedby="password-requirements"
              />
            </FormControl>
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              @click="showNewPassword = !showNewPassword"
              aria-label="Toggle new password visibility"
            >
              <Icon
                :name="
                  showNewPassword ? 'heroicons:eye-slash' : 'heroicons:eye'
                "
                class="w-5 h-5"
              />
            </button>
          </div>

          <PasswordStrengthIndicator
            :password="form.values.newPassword || ''"
          />

          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Confirm New Password -->
      <FormField v-slot="{ componentField }" name="confirmPassword">
        <FormItem>
          <FormLabel class="flex items-center gap-1">
            Confirm New Password
            <span class="text-destructive">*</span>
          </FormLabel>
          <div class="relative max-w-md">
            <FormControl>
              <Input
                v-bind="componentField"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm new password"
                class="w-full pr-10"
              />
            </FormControl>
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
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Update Password Button -->
      <div class="flex items-center gap-3 pt-4">
        <Button
          type="submit"
          :disabled="!canSubmit"
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
