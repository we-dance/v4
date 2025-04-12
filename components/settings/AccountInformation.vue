<script setup lang="ts">
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useMutation } from 'vue-query'
import { userSchema, type User } from '~/schemas/user'

const { session } = useAppAuth()
const { $client } = useNuxtApp()
const user = await $client.users.currentUser.query()

// @todo: account settings: add timezone
const form = useForm({
  validationSchema: toTypedSchema(userSchema),
})

form.setValues({
  ...session.value?.user,
})

const updateAccountMutation = useMutation(
  async (values: User) => {
    const userId = user?.id

    if (!userId) {
      throw new Error('User not authenticated')
    }

    return await $client.users.update.mutate({
      id: userId,
      data: values,
    })
  },
  {
    onSuccess: () => {
      toast.success('Account updated', {
        description: 'Your account information has been updated successfully.',
      })
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || 'Failed to update account information.'
      toast.error('Error', {
        description: errorMessage,
      })
    },
  }
)

const isUpdatingAccount = computed(() => updateAccountMutation.isLoading.value)

const canSubmit = computed(() => {
  return form.meta.value.dirty && !isUpdatingAccount.value
})

const onSubmit = form.handleSubmit(async (values) => {
  updateAccountMutation.mutate(values)
})
</script>

<template>
  <div class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:user-circle" class="w-5 h-5" />
      Account Information
    </h2>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <FormField v-slot="{ componentField }" name="firstName">
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

        <FormField v-slot="{ componentField }" name="lastName">
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
      </div>

      <FormField v-slot="{ componentField }" name="email">
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

      <FormField v-slot="{ componentField }" name="phone">
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

      <div class="flex justify-start pt-4">
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
