<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'

const { login } = useAppAuth()

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const form = useForm({
  validationSchema: toTypedSchema(schema),
})

const onSubmit = form.handleSubmit(
  async (values) => {
    const error = await login('credentials', {
      email: values.email,
      password: values.password,
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
    <TermsInfo />
    <div class="flex justify-end">
      <Button type="submit"> Login </Button>
    </div>
  </form>
</template>
