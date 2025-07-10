<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'

const { $client } = useNuxtApp()
const router = useRouter()

const schema = z.object({
  name: z.string().min(1),
})

const form = useForm({
  validationSchema: toTypedSchema(schema),
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const onSubmit = form.handleSubmit(
  async (values) => {
    await $client.events.create.mutate(values)
    emit('close')
  },
  (e) => {
    toast.error('Please fix the errors in the form.')
  }
)
</script>

<template>
  <form @submit="onSubmit" class="w-[650px]">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name Of Your Event</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <div class="flex gap-2 justify-end mt-4">
      <NuxtLink to="/admin/events/import">
        <Button variant="outline" type="button">Back</Button>
      </NuxtLink>
      <Button type="submit"> Save</Button>
    </div>
  </form>
</template>
