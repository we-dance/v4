<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'
import { ref } from 'vue'

const isLoading = ref(false)
const isFinished = ref(false)

const schema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
})

const form = useForm({
  validationSchema: toTypedSchema(schema),
})

const onSubmit = form.handleSubmit(
  async (values) => {
    try {
      isLoading.value = true
      await $fetch('/api/auth/reset-password', {
        method: 'POST',
        body: {
          password: values.password,
          token: useRoute().query.token,
        },
      })
    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }

    isLoading.value = false
  },
  () => {
    toast.error('Please fix the errors in the form.')
  }
)
</script>

<template>
  <div v-if="isFinished">Now you can login using new password.</div>
  <form v-else @submit="onSubmit" class="space-y-6">
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>New Password</FormLabel>
        <FormControl>
          <div class="relative">
            <Input
              v-bind="componentField"
              type="password"
              placeholder="Enter your password"
              :disabled="isLoading"
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="confirmPassword">
      <FormItem>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
          <div class="relative">
            <Input
              v-bind="componentField"
              type="password"
              placeholder="Enter your password"
              :disabled="isLoading"
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="space-y-4">
      <Button type="submit" class="w-full" :disabled="isLoading">
        <Icon
          v-if="isLoading"
          name="lucide:loader-2"
          class="mr-2 h-4 w-4 animate-spin"
        />
        {{ isLoading ? 'Resetting...' : 'Reset Password' }}
      </Button>
    </div>

    <TermsInfo />
  </form>
</template>
