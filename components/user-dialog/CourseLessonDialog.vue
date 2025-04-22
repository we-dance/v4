<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const props = defineProps<{
  lesson?: any
  onSuccess?: (lessonId: string, values: any) => void
}>()

const dialog = useDialog()

const schema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Name is required'),
    duration: z.number().min(1, 'Duration is required'),
    videoId: z.string().optional(),
    locked: z.boolean().optional(),
  })
)

const form = useForm({
  validationSchema: schema,
  initialValues: {
    name: props.lesson?.name || '',
    duration: props.lesson?.duration || 0,
    videoId: props.lesson?.videoId || '',
    locked: props.lesson?.locked || false,
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  if (props.onSuccess) {
    await props.onSuccess(props.lesson?.id || '', values)
  }
  dialog.close()
})
</script>

<template>
  <DialogHeader>
    <DialogTitle>{{ lesson ? 'Edit' : 'Add' }} Lesson</DialogTitle>
    <DialogDescription>
      {{
        lesson ? 'Edit the lesson details' : 'Add a new lesson to the module'
      }}
    </DialogDescription>
  </DialogHeader>

  <form @submit="onSubmit" class="space-y-4">
    <FormField name="name" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter lesson name" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="duration" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Duration (seconds)</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            type="number"
            min="1"
            placeholder="Enter lesson duration"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="videoId" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Video ID</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter video ID" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="locked" v-slot="{ value, handleChange }">
      <FormItem class="flex flex-row items-start space-x-3 space-y-0">
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Locked</FormLabel>
          <FormDescription>
            Lock this lesson until previous lessons are completed
          </FormDescription>
        </div>
      </FormItem>
    </FormField>

    <DialogFooter>
      <Button type="button" variant="ghost" @click="dialog.close">
        Cancel
      </Button>
      <Button type="submit">Save</Button>
    </DialogFooter>
  </form>
</template>
