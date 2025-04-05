<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { useDialog } from '@/composables/useDialog'

// Props: accept lesson data for editing and a success callback
const props = defineProps<{
  lessonData?: {
    id?: string
    name: string
    duration?: number | null
    videoId?: string | null
    locked?: boolean
  }
  onSuccess?: (values: {
    name: string
    duration?: number | null
    videoId?: string | null
    locked?: boolean
  }) => void
}>()

const dialog = useDialog()

// Schema for lesson validation
const lessonSchema = z.object({
  name: z
    .string()
    .min(1, 'Lesson name is required')
    .max(150, 'Name cannot exceed 150 characters'),
  duration: z.coerce
    .number()
    .int()
    .min(0, 'Duration must be a non-negative integer (minutes)')
    .optional()
    .nullable(),
  videoId: z
    .string()
    .max(100, 'Video ID cannot exceed 100 characters')
    .optional()
    .nullable(),
  locked: z.boolean().optional().default(false),
})

// Form setup
const form = useForm({
  validationSchema: toTypedSchema(lessonSchema),
  initialValues: props.lessonData
    ? { ...props.lessonData }
    : {
        name: '',
        duration: null,
        videoId: '',
        locked: false,
      },
})

// Handle form submission
const onSubmit = form.handleSubmit(
  async (values) => {
    try {
      props.onSuccess?.(values)
      dialog.close()
      toast.success(
        `Lesson ${props.lessonData ? 'updated' : 'added'} successfully!`
      )
    } catch (error: any) {
      toast.error(
        error.message || 'An unexpected error occurred while saving the lesson.'
      )
    }
  },
  (e) => {
    toast.error('Please fix the errors in the form.')
    console.error('Lesson form validation errors:', e.errors)
  }
)
</script>

<template>
  <DialogHeader>
    <DialogTitle>{{ props.lessonData ? 'Edit' : 'Add' }} Lesson</DialogTitle>
    <DialogDescription>
      {{
        props.lessonData
          ? 'Edit the details of this lesson.'
          : 'Add a new lesson to the module.'
      }}
    </DialogDescription>
  </DialogHeader>

  <form @submit="onSubmit" class="space-y-6 py-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Lesson Name</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            placeholder="e.g., Warm-up exercises"
            required
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="grid grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="duration">
        <FormItem>
          <FormLabel>Duration (minutes, Optional)</FormLabel>
          <FormControl>
            <Input
              type="number"
              min="0"
              step="1"
              v-bind="componentField"
              placeholder="e.g., 15"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="videoId">
        <FormItem>
          <FormLabel>Video ID (Optional)</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              placeholder="e.g., YouTube or Vimeo ID"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <FormField v-slot="{ value, handleChange }" name="locked">
      <FormItem
        class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
      >
        <div class="space-y-0.5">
          <FormLabel>Locked Lesson</FormLabel>
          <FormDescription>
            Require users to complete previous lessons or purchase access.
          </FormDescription>
        </div>
        <FormControl>
          <Switch :checked="value" @update:checked="handleChange" />
        </FormControl>
      </FormItem>
    </FormField>

    <DialogFooter>
      <Button type="button" variant="ghost" @click="dialog.close">
        Cancel
      </Button>
      <Button type="submit" :disabled="form.isSubmitting.value">
        {{ form.isSubmitting.value ? 'Saving...' : 'Save Lesson' }}
      </Button>
    </DialogFooter>
  </form>
</template>
