<script setup lang="ts">
defineProps({
  register: Boolean,
})

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

async function onSubmit(values: Record<string, any>) {
  const error = await login('credentials', values)

  if (error) {
    toast.error(error)
  }
}
</script>

<template>
  <AutoForm
    class="space-y-4"
    :form="form"
    :schema="schema"
    :field-config="{
      email: { inputProps: { type: 'email' } },
      password: { inputProps: { type: 'password' } },
    }"
    @submit="onSubmit"
  >
    <TermsInfo />

    <div class="flex justify-end">
      <Button type="submit"> Login </Button>
    </div>
  </AutoForm>
</template>
