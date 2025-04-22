<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'

const props = defineProps<{
  course: any
}>()

const dialog = useDialog()
const { $client } = useNuxtApp()

const schema = z.object({
  rating: z.number().min(1).max(5),
  body: z.string().optional(),
})

const form = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    rating: 5,
    body: '',
  },
})

const onSubmit = form.handleSubmit(
  async (values) => {
    await $client.courses.addReview.mutate({
      courseId: props.course.id,
      ...values,
    })
    dialog.close()
    toast.success('Review added successfully')
  },
  (e) => {
    toast.error('Please fix the errors in the form')
  }
)
</script>

<template>
  <DialogHeader>
    <DialogTitle>How was your experience?</DialogTitle>
    <DialogDescription>
      Please rate the course and write a review if you have any feedback.
    </DialogDescription>
  </DialogHeader>

  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="rating">
      <FormItem>
        <FormControl>
          <RatingInput v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="body">
      <FormControl>
        <Textarea v-bind="componentField" placeholder="Write a review" />
      </FormControl>
    </FormField>

    <DialogFooter>
      <Button type="submit">Submit</Button>
    </DialogFooter>
  </form>
</template>
