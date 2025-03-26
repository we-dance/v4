<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'

const courseInfoSchema = z.object({
  name: z.string().min(1, 'Course title is required'),
  instructor: z.object({
    name: z.string().min(1, 'Instructor name is required'),
  }),
  offers: z.array(
    z.object({
      '@type': z.literal('PriceSpecification'),
      price: z.number().min(0, 'Price must be a positive number'),
      priceCurrency: z.string().default('USD'),
    })
  ).min(1),
  educationalLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  timeRequired: z.string().min(1, 'Course duration is required'),
  description: z.string().min(1, 'Course description is required'),
})

type CourseInfoForm = z.infer<typeof courseInfoSchema>

const { handleSubmit, resetForm, values } = useForm<CourseInfoForm>({
  validationSchema: courseInfoSchema,
  initialValues: {
    name: '',
    instructor: {
      name: '',
    },
    offers: [{
      '@type': 'PriceSpecification',
      price: 0,
      priceCurrency: 'USD',
    }],
    educationalLevel: 'Beginner',
    timeRequired: '',
    description: '',
  },
})

const onSubmit = handleSubmit((values) => {
  toast.success('Course information saved successfully')
  // Here you would typically save the course info
  console.log('Form submitted:', values)
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6 max-w-2xl mx-auto p-6">
    <div class="space-y-4">
      <FormField name="name">
        <FormLabel>Course Title</FormLabel>
        <FormControl>
          <Input
            placeholder="e.g., Cuban Salsa for Beginners"
            :rules="{ required: 'Course title is required' }"
          />
        </FormControl>
        <FormMessage />
      </FormField>

      <FormField name="instructor.name">
        <FormLabel>Instructor Name</FormLabel>
        <FormControl>
          <Input
            placeholder="Instructor full name"
            :rules="{ required: 'Instructor name is required' }"
          />
        </FormControl>
        <FormMessage />
      </FormField>

      <FormField name="offers.0.price">
        <FormLabel>Course Price</FormLabel>
        <FormControl>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              type="number"
              min="0"
              step="0.01"
              class="pl-8"
              placeholder="99.99"
              :rules="{ required: 'Price is required' }"
            />
          </div>
        </FormControl>
        <FormDescription>Enter the price in USD</FormDescription>
        <FormMessage />
      </FormField>

      <FormField name="educationalLevel">
        <FormLabel>Educational Level</FormLabel>
        <Select :value="values.educationalLevel">
          <SelectTrigger>
            <SelectValue placeholder="Select a level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormField>

      <FormField name="timeRequired">
        <FormLabel>Course Duration</FormLabel>
        <FormControl>
          <Input
            placeholder="e.g., 4 weeks, 2 months"
            :rules="{ required: 'Course duration is required' }"
          />
        </FormControl>
        <FormDescription>Specify the total duration of the course</FormDescription>
        <FormMessage />
      </FormField>

      <FormField name="description">
        <FormLabel>Course Description</FormLabel>
        <FormControl>
          <Editor
            placeholder="Describe what students will learn clearly and engagingly."
            :rules="{ required: 'Course description is required' }"
          />
        </FormControl>
        <FormMessage />
      </FormField>
    </div>

    <div class="flex justify-end space-x-4">
      <Button variant="outline" type="button" @click="resetForm">
        Reset
      </Button>
      <Button type="submit">
        Save Course Information
      </Button>
    </div>
  </form>
</template> 