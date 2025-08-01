<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'

const { $client } = useNuxtApp()

const schema = z.object({
  url: z.string().url(),
})

const form = useForm({ validationSchema: toTypedSchema(schema) })

const router = useRouter()

const onSubmit = form.handleSubmit(async (values) => {
  const promise = $client.events.import.mutate({
    sourceUrl: values.url,
  })
  toast.promise(promise, {
    loading: 'Scheduling event import...',
    success: 'Event is scheduled for import.',
    error: (error: any) => (error as Error).message,
  })
  promise.then(() => {
    router.push('/admin/events')
  })
})
</script>

<template>
  <form @submit="onSubmit" class="w-[650px]">
    <FormField v-slot="{ componentField }" name="url">
      <FormItem>
        <h1>Add Existing Event</h1>
        <FormControl>
          <Input type="text" placeholder="https://" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          Link to Facebook, Eventbrite, go&dance, and other SEO-optimized
          websites to easily import events. For more convenience
          <span class="text-red-500 underline cursor-pointer"
            >sync your events</span
          >
          directly from platforms like Facebook and Google Calendar.
        </FormDescription>
      </FormItem>
    </FormField>

    <div class="flex gap-2 justify-end mt-4">
      <Button as-child variant="outline">
        <NuxtLink to="/admin/events"> Cancel </NuxtLink>
      </Button>
      <Button type="submit">Import</Button>
    </div>

    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <Separator class="w-full" />
      </div>

      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">OR</span>
      </div>
    </div>

    <Button as-child class="w-full mt-4">
      <NuxtLink to="/admin/events/new">Create New Event</NuxtLink>
    </Button>
  </form>
</template>
