<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'
import { ref } from 'vue'

const { login } = useAppAuth()
const isLoading = ref(false)
const showPassword = ref(false)

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
})

const form = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    rememberMe: false,
  },
})

const onSubmit = form.handleSubmit(
  async (values) => {
    try {
      isLoading.value = true
      const error = await login('credentials', {
        email: values.email,
        password: values.password,
      })
      if (error) {
        toast.error(error)
      }
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
  <form @submit="onSubmit" class="space-y-6">
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

    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <div class="relative">
            <Input
              v-bind="componentField"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              :disabled="isLoading"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              @click="showPassword = !showPassword"
            >
              <Icon
                :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                class="h-4 w-4 text-muted-foreground"
              />
            </Button>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex items-center justify-between">
      <FormField v-slot="{ componentField }" name="rememberMe">
        <FormItem class="flex flex-row items-center space-x-2 space-y-0">
          <FormControl>
            <Checkbox v-bind="componentField" :disabled="isLoading" />
          </FormControl>
          <FormLabel class="text-sm font-normal">Remember me</FormLabel>
        </FormItem>
      </FormField>

      <NuxtLink
        to="/forgot-password"
        class="text-sm text-info hover:underline"
        :class="{ 'pointer-events-none opacity-50': isLoading }"
      >
        Forgot password?
      </NuxtLink>
    </div>

    <div class="space-y-4">
      <Button type="submit" class="w-full" :disabled="isLoading">
        <Icon
          v-if="isLoading"
          name="lucide:loader-2"
          class="mr-2 h-4 w-4 animate-spin"
        />
        {{ isLoading ? 'Signing in...' : 'Sign in' }}
      </Button>
    </div>

    <TermsInfo />
  </form>
</template>
