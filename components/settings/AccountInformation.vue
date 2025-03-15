<script setup lang="ts">
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const props = defineProps<{
  initialEmail: string
  initialFirstName?: string
  initialLastName?: string
  initialPhone?: string
}>()

// Define validation schema
const accountSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().min(1, 'Phone number is required'),
})

// Setup form with validation
const form = useForm({
  validationSchema: toTypedSchema(accountSchema),
  initialValues: {
    email: props.initialEmail || '',
    firstName: props.initialFirstName || '',
    lastName: props.initialLastName || '',
    phone: props.initialPhone || '',
  },
})

// UI state
const isUpdatingAccount = ref(false)

// Computed property to check if form can be submitted
const canSubmit = computed(() => {
  // @ts-ignore - meta.dirty exists but TypeScript doesn't recognize it
  return form.meta.value.dirty && !isUpdatingAccount.value
})

// Form submission handler
const onSubmit = form.handleSubmit(async (values) => {
  isUpdatingAccount.value = true

  try {
    // TODO: Replace with actual API call
    await $fetch('/api/user/update', {
      method: 'PUT',
      body: {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
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
      <Icon name="heroicons:user-circle" class="w-5 h-5" />
      Account Information
    </h2>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- First Name -->
      <FormField v-slot="{ componentField, errorMessage }" name="firstName">
        <FormItem>
          <FormLabel class="flex items-center gap-1">
            First Name
            <span class="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Your first name"
              class="max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Last Name -->
      <FormField v-slot="{ componentField, errorMessage }" name="lastName">
        <FormItem>
          <FormLabel class="flex items-center gap-1">
            Last Name
            <span class="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Your last name"
              class="max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Email -->
      <FormField v-slot="{ componentField, errorMessage }" name="email">
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
          </div>
          <FormDescription id="email-description">
            This email is used for account notifications and recovery
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Phone -->
      <FormField v-slot="{ componentField, errorMessage }" name="phone">
        <FormItem>
          <FormLabel class="flex items-center gap-1">
            Phone
            <span class="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="tel"
              placeholder="Your phone number"
              class="max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Save Account Changes -->
      <div class="flex justify-end pt-4">
        <Button
          type="submit"
          :disabled="!canSubmit"
          class="flex items-center gap-2"
        >
          <Icon
            v-if="isUpdatingAccount"
            name="heroicons:arrow-path"
            class="w-4 h-4 animate-spin"
          />
          <Icon v-else name="heroicons:check" class="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </form>
  </div>
</template>
