<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { useDialog } from '@/composables/useDialog'

const props = defineProps<{
  module?: any
  onSuccess?: (
    moduleId: string,
    values: { name: string; description?: string | null }
  ) => void
}>()

const dialog = useDialog()

const moduleSchema = z.object({
  name: z
    .string()
    .min(1, 'Module name is required')
    .max(100, 'Name cannot exceed 100 characters'),
  description: z
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional()
    .nullable(),
})

const form = useForm({
  validationSchema: toTypedSchema(moduleSchema),
  initialValues: props.module
    ? { ...props.module }
    : {
        name: '',
        description: '',
      },
})

const onSubmit = form.handleSubmit(
  async (values) => {
    try {
      props.onSuccess?.(props.module?.id, values)
      dialog.close() // Close the dialog on success
      toast.success(
        `Module ${props.module ? 'updated' : 'added'} successfully!`
      )
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred.')
    }
  },
  (e) => {
    toast.error('Please fix the errors in the form.')
    console.error('Form validation errors:', e.errors)
  }
)
</script>

<template>
  <DialogHeader>
    <DialogTitle>{{ props.module ? 'Edit' : 'Add' }} Module</DialogTitle>
    <DialogDescription>
      {{
        props.module
          ? 'Edit the details of this module.'
          : 'Create a new module for your course.'
      }}
    </DialogDescription>
  </DialogHeader>

  <form @submit="onSubmit" class="space-y-6 py-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Module Name</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            placeholder="e.g., Introduction to Salsa"
            required
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description (Optional)</FormLabel>
        <FormControl>
          <Textarea
            v-bind="componentField"
            placeholder="Briefly describe the content of this module."
            rows="3"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <DialogFooter>
      <Button type="button" variant="ghost" @click="dialog.close">
        Cancel
      </Button>
      <Button type="submit" :disabled="form.isSubmitting.value">
        {{ form.isSubmitting.value ? 'Saving...' : 'Save Module' }}
      </Button>
    </DialogFooter>
  </form>
</template>
