<script setup lang="ts">
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const props = defineProps<{
  initialEmail: string
}>()

// Define validation schema
const accountSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
})

// Setup form with validation
const form = useForm({
  validationSchema: toTypedSchema(accountSchema),
  initialValues: {
    email: props.initialEmail || '',
  },
})

// UI state
const isUpdatingAccount = ref(false)

// Form submission handler
const onSubmit = form.handleSubmit(async (values) => {
  isUpdatingAccount.value = true

  try {
    // TODO: Replace with actual API call
    await $fetch('/api/user/update', {
      method: 'PUT',
      body: {
        email: values.email,
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
})
</script>

<template>
  <div class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:envelope" class="w-5 h-5" />
      Account Information
    </h2>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- Email -->
      <FormField v-slot="{ componentField, errorMessage, value }" name="email">
        <FormItem>
          <FormLabel class="flex items-center gap-1">
            Email
            <span class="text-destructive">*</span>
          </FormLabel>
          <div class="flex items-center gap-2">
            <FormControl>
              <Input
                v-bind="componentField"
                type="email"
                placeholder="Your email address"
                class="max-w-md"
                aria-describedby="email-description"
              />
            </FormControl>
            <div v-if="isUpdatingAccount" class="animate-spin">
              <Icon name="heroicons:arrow-path" class="w-5 h-5" />
            </div>
          </div>
          <FormDescription id="email-description">
            This email is used for account notifications and recovery
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Save Account Changes -->
      <div class="flex justify-end pt-4">
        <Button
          type="submit"
          :disabled="!form.meta.valid || isUpdatingAccount"
          class="flex items-center gap-2"
        >
          <Icon name="heroicons:check" class="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </form>
  </div>
</template>
