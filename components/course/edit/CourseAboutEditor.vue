<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { useForm } from 'vee-validate'
const { course } = defineProps({
  course: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['load'])

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
]

const statusSchema = z.enum(['draft', 'published', 'archived']).default('draft')

const schema = z.object({
  name: z.string().min(1),
  description: z.string().optional().default(''),
  coverUrl: z.string().optional().default(''),
  status: statusSchema,
})

const validationSchema = toTypedSchema(schema)

const { $client } = useNuxtApp()

const save = async (values: any) => {
  const promise = $client.courses.update.mutate({
    slug: course.slug,
    ...values,
  })
  toast.promise(promise, {
    loading: 'Updating course...',
    success: 'Course updated successfully',
    error: (error: any) => (error as Error).message,
  })
  promise.then(() => {
    emit('load')
  })
}

const router = useRouter()

const alertDialog = useAlertDialog()

const deleteCourse = () => {
  const promise = $client.courses.delete.mutate({
    id: course.id,
  })
  toast.promise(promise, {
    loading: 'Deleting course...',
    success: 'Course deleted successfully',
    error: (error: any) => (error as Error).message,
  })
  promise.then(() => {
    router.push('/admin/courses')
  })
}

const askToDelete = () => {
  alertDialog.open({
    title: 'Delete Course',
    description: 'Are you sure you want to delete this course?',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    onConfirm: () => {
      alertDialog.close()
      deleteCourse()
    },
    onCancel: () => {
      alertDialog.close()
    },
  })
}
</script>

<template>
  <Form
    :initial-values="course"
    :validation-schema="validationSchema"
    @submit="save"
  >
    <div class="space-y-4">
      <FormField v-slot="{ componentField }" name="status">
        <FormItem>
          <FormLabel>Status</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select course status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem
                v-for="option in statusOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="coverUrl">
        <FormItem>
          <FormLabel>Cover Image URL</FormLabel>
          <FormControl>
            <Input v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex justify-end">
        <Button type="submit" class="rounded-r-none">Save</Button>
        <DropdownMenu>
          <DropdownMenuTrigger class="rounded-l-none" as-child>
            <Button class="rounded-l-none">
              <Icon name="heroicons:chevron-down" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem @click="askToDelete()">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </Form>
</template>
