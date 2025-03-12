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
  const { data } = await $client.profiles.get.useQuery({ username })

  if (data.value?.id) {
    return false
  }

  return true
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
  city: z.object({
    placeId: z.string(),
    label: z.string(),
  }),
  pronounce: z.enum(['he', 'she', 'they']),
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
      cityId: values.city.placeId,
      cityLabel: values.city.label,
      pronounce: values.pronounce,
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
    <FormField v-slot="{ componentField }" name="pronounce">
      <FormItem>
        <FormLabel>Pronounce</FormLabel>
        <FormControl>
          <RadioGroup class="flex gap-4 justify-center" v-bind="componentField">
            <FormItem class="flex items-center space-y-0 gap-x-3">
              <FormControl>
                <RadioGroupItem value="he" />
              </FormControl>
              <FormLabel class="font-normal"> he </FormLabel>
            </FormItem>
            <FormItem class="flex items-center space-y-0 gap-x-3">
              <FormControl>
                <RadioGroupItem value="she" />
              </FormControl>
              <FormLabel class="font-normal"> she </FormLabel>
            </FormItem>
            <FormItem class="flex items-center space-y-0 gap-x-3">
              <FormControl>
                <RadioGroupItem value="they" />
              </FormControl>
              <FormLabel class="font-normal"> they </FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
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
    <FormField v-slot="{ componentField }" name="city">
      <FormItem>
        <FormLabel>City</FormLabel>
        <FormControl>
          <CityInput v-bind="componentField" />
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
