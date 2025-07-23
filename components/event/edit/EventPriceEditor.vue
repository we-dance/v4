<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'
const props = defineProps({
  event: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['load'])

const schema = z.object({
  ticketUrl: z.string().url().optional().nullable(),
  price: z.string().optional().nullable(),
})

const validationSchema = toTypedSchema(schema)

const { $client } = useNuxtApp()

const save = async (values: any) => {
  const promise = $client.events.update.mutate({
    id: props.event.id,
    ...values,
  })
  toast.promise(promise, {
    loading: 'Updating event...',
    success: 'Event updated successfully',
    error: (error: any) => (error as Error).message,
  })
  promise.then(() => {
    emit('load')
  })
}
</script>

<template>
  <Form
    :initial-values="props.event"
    :validation-schema="validationSchema"
    @submit="save"
  >
    <div class="space-y-4">
      <FormField v-slot="{ componentField }" name="price">
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="ticketUrl">
        <FormItem>
          <FormLabel>Ticket URL</FormLabel>
          <FormControl>
            <Input v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">Save</Button>
    </div>
  </Form>
</template>
