<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { registerSchema } from '~/schemas/user'
import { ref } from 'vue'

const { login } = useAppAuth()
const showPassword = ref(false)

const callbackUrl = ref(useRoute().query.redirect || '/')

const form = useForm({
  validationSchema: toTypedSchema(registerSchema),
})

const onSubmit = form.handleSubmit(
  async (values) => {
    const error = await login('register', {
      ...values,
      callbackUrl: callbackUrl.value,
    })
    if (error) {
      toast.error(error)
    }
  },
  (e) => {
    toast.error('Please fix the errors in the form.')
  }
)
</script>
<template>
  <form @submit="onSubmit">
    <div class="grid grid-cols-2 gap-x-4">
      <FormField v-slot="{ componentField }" name="firstName">
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input v-bind="componentField" autocomplete="given-name" />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="lastName">
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input v-bind="componentField" autocomplete="family-name" />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField v-slot="{ componentField }" name="phone">
      <FormItem>
        <FormLabel>Phone</FormLabel>
        <FormControl>
          <PhoneInput v-bind="componentField" autocomplete="tel" />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input v-bind="componentField" autocomplete="email" />
        </FormControl>
        <FormDescription />
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
              placeholder="Create a password"
              autocomplete="new-password"
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
        <FormDescription />
        <PasswordStrengthIndicator :password="form.values.password || ''" />
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ value, handleChange }" name="emailConsent">
      <FormItem class="flex flex-row items-start gap-x-3 space-y-0 py-4">
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel
            >I agree to receive emails from WeDance. I can unsubscribe from
            non-essential emails at any time.</FormLabel
          >
          <FormDescription />
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <TermsInfo />
    <div class="flex justify-end">
      <Button type="submit"> Register </Button>
    </div>
  </form>
</template>
