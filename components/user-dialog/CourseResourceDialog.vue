<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'

const props = defineProps<{
  resource?: any
  onSuccess?: (resourceId: string, values: any) => void
}>()

const dialog = useDialog()

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  url: z.string().min(1, 'URL is required'),
  locked: z.boolean().default(false),
})

const form = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: props.resource
    ? { ...props.resource }
    : {
        name: '',
        description: '',
        url: '',
        locked: false,
      },
})

const onSubmit = form.handleSubmit(
  async (values) => {
    try {
      props.onSuccess?.(props.resource?.id || '', values)
      dialog.close()
      toast.success(
        `Resource ${props.resource ? 'updated' : 'added'} successfully!`
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
    <DialogTitle>{{ props.resource ? 'Edit' : 'Add' }} Resource</DialogTitle>
    <DialogDescription>
      {{
        props.resource
          ? 'Edit the details of this resource.'
          : 'Add a new resource to your course.'
      }}
    </DialogDescription>
  </DialogHeader>

  <form @submit="onSubmit" class="space-y-6 py-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Resource Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="e.g., Course Workbook" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea
            v-bind="componentField"
            placeholder="Describe this resource"
            rows="3"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="url">
      <FormItem>
        <FormLabel>Resource URL</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            placeholder="https://example.com/resource"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="locked">
      <FormItem class="flex flex-row items-start space-x-3 space-y-0">
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Locked</FormLabel>
          <FormDescription>
            Lock this resource until course requirements are met
          </FormDescription>
        </div>
      </FormItem>
    </FormField>

    <DialogFooter>
      <Button type="button" variant="ghost" @click="dialog.close">
        Cancel
      </Button>
      <Button type="submit" :disabled="form.isSubmitting.value">
        {{ form.isSubmitting.value ? 'Saving...' : 'Save Resource' }}
      </Button>
    </DialogFooter>
  </form>
</template>
