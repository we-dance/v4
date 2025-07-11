<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useNuxtApp } from '#app'
import { toast } from 'vue-sonner'

const { $client } = useNuxtApp()
const router = useRouter()

const schema = z.object({
  url: z.string().url(),
})

const form = useForm({ validationSchema: toTypedSchema(schema) })

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const { eventId } = await $client.events.import.mutate({
      sourceUrl: values.url,
    })
    toast.success('Your import has started.')
  } catch (e: any) {
    toast.error('Your impport failed, please try again later.')
    console.log(e.message ?? 'Import Failed')
  }
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
      <NuxtLink to="/admin/events">
        <Button variant="outline" type="button">Cancel</Button>
      </NuxtLink>
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

    <NuxtLink to="/admin/events/new">
      <Button variant="outline" class="w-full mt-4">Create new event</Button>
    </NuxtLink>
  </form>
</template>
