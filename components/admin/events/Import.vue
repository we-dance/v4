<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useNuxtApp } from '#app'

const { $client } = useNuxtApp()
const dialog = useDialog()

const schema = z.object({
  url: z.string().url(),
})

const form = useForm({ validationSchema: toTypedSchema(schema) })

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await $client.events.import.mutate({ sourceUrl: values.url })
  } catch (e: any) {
    console.log(e.message ?? 'Import Failed')
  }
})

const handleCreateEvent = () => {
  dialog.close()
  dialog.open({
    component: 'EventCreateDialog',
  })
}
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="url">
      <FormItem>
        <FormLabel>Add Existing Event</FormLabel>
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

    <div class="flex gap-2 justify-end">
      <Button variant="outline" type="button" @click="dialog.close"
        >Cancel</Button
      >
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

    <Button variant="outline" class="w-full" @click="handleCreateEvent"
      >Create new event</Button
    >
  </form>
</template>
