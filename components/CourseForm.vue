<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { courseFormSchema, type CourseFormData } from '~/schemas/course'

const props = defineProps<{
  initialData?: CourseFormData
}>()

const emit = defineEmits<{
  submit: [CourseFormData]
}>()

const { handleSubmit, resetForm, values } = useForm({
  validationSchema: toFormValidator(courseFormSchema),
  initialValues: props.initialData
})

const educationalLevels = ['Beginner', 'Intermediate', 'Advanced', 'AllLevels']
const courseModes = ['online', 'onsite', 'hybrid']
const languages = ['English', 'Spanish', 'French', 'German'] // We can expand this list

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Basic Information -->
      <Card class="col-span-2">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <FormField
            name="title"
            label="Course Title"
            placeholder="Enter course title"
          />

          <FormField
            name="description"
            label="Description"
            type="textarea"
            placeholder="Describe your course"
          />

          <div class="grid grid-cols-2 gap-4">
            <FormField
              name="educationalLevel"
              label="Level"
              type="select"
              :options="educationalLevels"
            />
            
            <FormField
              name="courseMode"
              label="Course Mode"
              type="select"
              :options="courseModes"
            />
          </div>
        </CardContent>
      </Card>

      <!-- Media -->
      <Card class="col-span-2">
        <CardHeader>
          <CardTitle>Course Media</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <FormField
            name="image.url"
            label="Cover Image"
            type="file"
            accept="image/*"
          />

          <FormField
            name="video.url"
            label="Preview Video"
            type="file"
            accept="video/*"
          />
        </CardContent>
      </Card>

      <!-- Pricing -->
      <Card class="col-span-2">
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <FormField
              name="price"
              label="Price"
              type="number"
              placeholder="99"
            />

            <FormField
              name="priceCurrency"
              label="Currency"
              type="select"
              :options="['USD', 'EUR', 'GBP']"
            />
          </div>
        </CardContent>
      </Card>

      <!-- Additional Details -->
      <Card class="col-span-2">
        <CardHeader>
          <CardTitle>Additional Details</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <FormField
            name="inLanguage"
            label="Languages"
            type="select"
            :options="languages"
            multiple
          />

          <FormField
            name="timeRequired"
            label="Course Duration"
            placeholder="e.g., 6 weeks"
          />
        </CardContent>
      </Card>
    </div>

    <div class="flex justify-end gap-4">
      <Button variant="outline" type="button" @click="resetForm">
        Reset
      </Button>
      <Button type="submit">
        {{ props.initialData ? 'Update Course' : 'Create Course' }}
      </Button>
    </div>
  </form>
</template> 