<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { useDialog } from '@/composables/useDialog'

// Props: accept module data for editing and a success callback
const props = defineProps<{
  moduleData?: {
    id?: string
    name: string
    description?: string | null
  }
  onSuccess?: (values: { name: string; description?: string | null }) => void
}>()

const dialog = useDialog()

// Schema for module validation (currently just name and description)
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

// Form setup using vee-validate
const form = useForm({
  validationSchema: toTypedSchema(moduleSchema),
  initialValues: props.moduleData
    ? { ...props.moduleData }
    : {
        name: '',
        description: '',
      },
})

// Handle form submission
const onSubmit = form.handleSubmit(
  async (values) => {
    try {
      // Call the success callback passed from the parent
      props.onSuccess?.(values)
      dialog.close() // Close the dialog on success
      toast.success(
        `Module ${props.moduleData ? 'updated' : 'added'} successfully!`
      )
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred.')
    }
  },
  (e) => {
    // Handle validation errors (optional: vee-validate shows messages automatically)
    toast.error('Please fix the errors in the form.')
    console.error('Form validation errors:', e.errors)
  }
)
</script>

<template>
  <DialogHeader>
    <DialogTitle>{{ props.moduleData ? 'Edit' : 'Add' }} Module</DialogTitle>
    <DialogDescription>
      {{
        props.moduleData
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
            placeholder="e.g., Introduction to WeDance"
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
