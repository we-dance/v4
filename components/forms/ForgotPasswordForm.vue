<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'
import { ref } from 'vue'

const isLoading = ref(false)
const isFinished = ref(false)

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const form = useForm({
  validationSchema: toTypedSchema(schema),
})

const onSubmit = form.handleSubmit(
  async (values) => {
    try {
      isLoading.value = true
      await $fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: values,
      })
      isFinished.value = true
    } catch (e) {
      toast.error(e.message)
    } finally {
      isLoading.value = false
    }
  },
  () => {
    toast.error('Please fix the errors in the form.')
  }
)
</script>

<template>
  <div v-if="isFinished">Please follow instructions in your email.</div>
  <form v-else @submit="onSubmit" class="space-y-6">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            type="email"
            placeholder="Enter your email"
            :disabled="isLoading"
          />
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
        {{ isLoading ? 'Sending' : 'Send Reset Link' }}
      </Button>
    </div>

    <TermsInfo />
  </form>
</template>
