<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'

const { $client } = useNuxtApp()
const { login } = useAppAuth()

const noMultiplePeriods = (value: string) => !value.includes('..')
const notEndingInPeriod = (value: string) => !value.endsWith('.')

const usernameValidator = async (username: string) => {
  const result = await $client.profiles.get.query({ username })

  if (!result) {
    return true
  }

  return false
}

const schema = z.object({
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters.')
    .max(30)
    .refine(
      noMultiplePeriods,
      'Username cannot have multiple periods in a row.'
    )
    .refine(notEndingInPeriod, 'Username cannot end in a period.')
    .refine(usernameValidator, 'Username is already taken.'),
  email: z.string().email(),
  password: z.string().min(8),
  emailConsent: z.boolean().refine((value) => value, {
    message: 'We need your consent to send you emails.',
  }),
})

const form = useForm({
  validationSchema: toTypedSchema(schema),
})

const onSubmit = form.handleSubmit(
  async (values) => {
    const error = await login('register', {
      username: values.username,
      email: values.email,
      password: values.password,
      emailConsent: values.emailConsent,
    })
    if (error) {
      toast.error(error)
    }
  },
  () => {
    toast.error('Please fix the errors in the form.')
  }
)
</script>
<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input v-bind="componentField" trim="[^a-z0-9._\-]+" lowercase />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="password" />
        </FormControl>
        <FormDescription />
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
