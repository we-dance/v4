<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { courseFormSchema, courseDurations, courseCategories, type CourseFormData } from '~/schemas/courseForm'
import { computed, onBeforeUnmount, ref, type ShallowRef } from 'vue'
import { EditorContent, type Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/vue-3'
import type { FormContext } from 'vee-validate'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#components'
import { Input } from '#components'
import { Button } from '#components'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#components'
import { Badge } from '#components'

const props = withDefaults(defineProps<{
  initialData?: Partial<CourseFormData>
  submitLabel?: string
}>(), {
  submitLabel: 'Create Course',
})

const emit = defineEmits<{
  (e: 'submit', data: CourseFormData): void
  (e: 'cancel'): void
}>()

const isEditorReady = ref(false)
const tags = ref<string[]>([])
const newTag = ref('')

const form = useForm<CourseFormData>({
  validationSchema: toTypedSchema(courseFormSchema),
  initialValues: {
    name: props.initialData?.name ?? '',
    description: props.initialData?.description ?? '',
    instructorName: props.initialData?.instructorName ?? '',
    price: props.initialData?.price ?? 0,
    duration: props.initialData?.duration ?? courseDurations[0],
    category: props.initialData?.category ?? courseCategories[0],
    tags: props.initialData?.tags ?? []
  },
})

const editor = useEditor({
  content: form.values.description,
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: 'prose prose-sm focus:outline-none min-h-[150px] max-w-none p-4',
    },
  },
  onCreate: () => {
    isEditorReady.value = true
  },
  onUpdate: ({ editor }) => {
    if (editor) {
      form.setFieldValue('description', editor.getHTML())
    }
  },
})

// Cleanup editor on component unmount
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

const onSubmit = form.handleSubmit((values) => {
  emit('submit', values)
})

// Format price as currency
const formattedPrice = computed(() => {
  if (!form.values.price) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(form.values.price)
})

// Handle price input with currency formatting
const handlePriceInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  // Remove currency formatting for the value
  const numericValue = parseFloat(input.value.replace(/[^0-9.-]+/g, ''))
  form.setFieldValue('price', isNaN(numericValue) ? 0 : numericValue)
}

// Handle tag input
const addTag = () => {
  if (newTag.value && !form.values.tags.includes(newTag.value) && form.values.tags.length < 5) {
    form.setFieldValue('tags', [...form.values.tags, newTag.value])
    newTag.value = ''
  }
}

const removeTag = (tag: string) => {
  form.setFieldValue('tags', form.values.tags.filter(t => t !== tag))
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Course Title -->
    <FormField v-slot="{ field, errorMessage }" :name="'name'" v-model="form.values.name">
      <FormItem>
        <FormLabel>Course Title</FormLabel>
        <FormControl>
          <Input
            v-bind="field"
            placeholder="e.g., Beginner Salsa Fundamentals"
            :class="{ 'border-destructive': errorMessage }"
          />
        </FormControl>
        <FormDescription>
          Choose a clear, descriptive title that reflects the course content and level
        </FormDescription>
        <FormMessage>{{ errorMessage }}</FormMessage>
      </FormItem>
    </FormField>

    <!-- Course Description -->
    <FormField v-slot="{ field, errorMessage }" :name="'description'" v-model="form.values.description">
      <FormItem>
        <FormLabel>Course Description</FormLabel>
        <FormControl>
          <div
            class="relative rounded-md border border-input bg-background"
            :class="{ 'border-destructive': errorMessage }"
          >
            <template v-if="isEditorReady && editor">
              <EditorContent
                :editor="editor"
                class="min-h-[150px]"
                data-placeholder="Describe what students will learn, prerequisites, and course structure..."
              />
            </template>
            <div
              v-else
              class="min-h-[150px] p-4 text-muted-foreground"
            >
              Loading editor...
            </div>
            <div
              v-if="form.values.description"
              class="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background px-2 py-1 rounded-md"
            >
              {{ form.values.description.length }}/2000
            </div>
          </div>
        </FormControl>
        <FormDescription>
          Write a comprehensive description that helps students understand what they'll learn
        </FormDescription>
        <FormMessage>{{ errorMessage }}</FormMessage>
      </FormItem>
    </FormField>

    <!-- Instructor Name -->
    <FormField v-slot="{ field, errorMessage }" :name="'instructorName'" v-model="form.values.instructorName">
      <FormItem>
        <FormLabel>Instructor Name</FormLabel>
        <FormControl>
          <Input
            v-bind="field"
            placeholder="e.g., Anna Smith"
            :class="{ 'border-destructive': errorMessage }"
          />
        </FormControl>
        <FormDescription>
          Enter the name that will be displayed as the course instructor
        </FormDescription>
        <FormMessage>{{ errorMessage }}</FormMessage>
      </FormItem>
    </FormField>

    <!-- Course Duration -->
    <FormField v-slot="{ field, errorMessage }" :name="'duration'" v-model="form.values.duration">
      <FormItem>
        <FormLabel>Estimated Duration</FormLabel>
        <Select :model-value="field.value" @update:model-value="field.onChange">
          <FormControl>
            <SelectTrigger :class="{ 'border-destructive': errorMessage }">
              <SelectValue placeholder="Select course duration" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem v-for="duration in courseDurations" :key="duration" :value="duration">
              {{ duration }}
            </SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>
          Choose the total time commitment required to complete the course
        </FormDescription>
        <FormMessage>{{ errorMessage }}</FormMessage>
      </FormItem>
    </FormField>

    <!-- Course Category -->
    <FormField v-slot="{ field, errorMessage }" :name="'category'" v-model="form.values.category">
      <FormItem>
        <FormLabel>Category</FormLabel>
        <Select :model-value="field.value" @update:model-value="field.onChange">
          <FormControl>
            <SelectTrigger :class="{ 'border-destructive': errorMessage }">
              <SelectValue placeholder="Select course category" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem v-for="category in courseCategories" :key="category" :value="category">
              {{ category }}
            </SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>
          Choose the main category that best describes your course
        </FormDescription>
        <FormMessage>{{ errorMessage }}</FormMessage>
      </FormItem>
    </FormField>

    <!-- Course Tags -->
    <FormField v-slot="{ errorMessage }" :name="'tags'" v-model="form.values.tags">
      <FormItem>
        <FormLabel>Tags</FormLabel>
        <div class="space-y-2">
          <div class="flex flex-wrap gap-2 min-h-[2.5rem] p-2 border rounded-md bg-background">
            <Badge 
              v-for="tag in form.values.tags" 
              :key="tag"
              variant="secondary"
              class="gap-1"
            >
              {{ tag }}
              <button 
                type="button"
                class="hover:text-destructive"
                @click="removeTag(tag)"
              >
                <Icon name="heroicons:x-mark" class="h-3 w-3" />
              </button>
            </Badge>
          </div>
          <div class="flex gap-2">
            <Input
              v-model="newTag"
              placeholder="Add a tag..."
              class="flex-1"
              @keydown.enter.prevent="addTag"
            />
            <Button 
              type="button"
              variant="outline"
              @click="addTag"
            >
              Add
            </Button>
          </div>
        </div>
        <FormDescription>
          Add up to 5 tags to help students find your course (press Enter or click Add)
        </FormDescription>
        <FormMessage>{{ errorMessage }}</FormMessage>
      </FormItem>
    </FormField>

    <!-- Course Price -->
    <FormField v-slot="{ field, errorMessage }" :name="'price'" v-model="form.values.price">
      <FormItem>
        <FormLabel>Course Price</FormLabel>
        <FormControl>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground"
            >
              $
            </div>
            <Input
              v-bind="field"
              :value="formattedPrice"
              @input="handlePriceInput"
              placeholder="49.99"
              class="pl-7"
              :class="{ 'border-destructive': errorMessage }"
            />
          </div>
        </FormControl>
        <FormDescription>
          Set your course price in USD (set to 0 for free courses)
        </FormDescription>
        <FormMessage>{{ errorMessage }}</FormMessage>
      </FormItem>
    </FormField>

    <div class="flex justify-end space-x-4">
      <Button variant="outline" type="button" @click="$emit('cancel')">
        Cancel
      </Button>
      <Button type="submit">{{ submitLabel }}</Button>
    </div>
  </form>
</template>

<style>
.ProseMirror {
  @apply p-3;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  @apply text-muted-foreground float-left pointer-events-none h-0;
}

.ProseMirror:focus {
  @apply outline-none;
}
</style> 