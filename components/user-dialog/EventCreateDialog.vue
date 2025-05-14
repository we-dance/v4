<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'

const { $client } = useNuxtApp()

const props = defineProps<{
  onSuccess?: () => void
}>()

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
    props.onSuccess?.()
    emit('close')
  },
  (e) => {
    toast.error('Please fix the errors in the form.')
  }
)
</script>

<template>
  <DialogHeader>
    <DialogTitle>Create Event</DialogTitle>
  </DialogHeader>

  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>

    <DialogFooter>
      <Button type="submit">Save</Button>
    </DialogFooter>
  </form>
</template>
