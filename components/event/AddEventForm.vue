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

const onSubmit = form.handleSubmit(
  async (values) => {
    const promise = $client.events.create.mutate(values)
    toast.promise(promise, {
      loading: 'Creating event...',
      success: 'Event created successfully',
      error: (error: any) => (error as Error).message,
    })
    promise.then(() => {
      router.push('/admin/events')
    })
  },
  (e) => {
    toast.error('Please fill out the name of your event.')
  }
)
</script>

<template>
  <form @submit="onSubmit" class="w-[650px]">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Event Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <div class="flex gap-2 justify-end mt-4">
      <Button as-child variant="outline">
        <NuxtLink to="/admin/events/import"> Back </NuxtLink>
      </Button>
      <Button type="submit"> Save</Button>
    </div>
  </form>
</template>
