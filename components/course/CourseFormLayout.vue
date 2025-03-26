<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CourseFormData } from '~/schemas/courseForm'

const props = defineProps<{
  mode: 'create' | 'edit'
  initialData?: Partial<CourseFormData>
  isLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'save-draft'): void
  (e: 'submit'): void
  (e: 'cancel'): void
  (e: 'section-change', section: string): void
}>()

const activeSection = ref('info')

// Track completed steps
const completedSteps = ref<Set<string>>(new Set())

// Mark a step as completed
const markStepCompleted = (stepId: string) => {
  completedSteps.value.add(stepId)
}

// Check if a step is completed
const isStepCompleted = (stepId: string) => {
  return completedSteps.value.has(stepId)
}

const tabs = computed(() => [
  {
    id: 'info',
    label: 'Course Info',
    icon: 'heroicons:document-text',
    description: 'Basic course details',
    badge: 'Required'
  },
  {
    id: 'modules',
    label: 'Course Modules',
    icon: 'heroicons:squares-2x2',
    description: 'Structure your content',
    badge: 'Required'
  },
  {
    id: 'materials',
    label: 'Materials',
    icon: 'heroicons:book-open',
    description: 'Additional resources',
    badge: 'Optional'
  },
  {
    id: 'review',
    label: 'Review & Publish',
    icon: 'heroicons:check-badge',
    description: 'Final review',
    badge: props.mode === 'create' ? 'Publish' : 'Update'
  }
])

const handleSectionChange = (section: string) => {
  activeSection.value = section
  emit('section-change', section)
}
</script>

<template>
  <div class="container py-6">
    <div class="flex items-center gap-4 mb-6">
      <Button variant="ghost" size="icon" @click="$emit('cancel')">
        <Icon name="lucide:arrow-left" class="h-4 w-4" />
      </Button>
      <div class="flex-1">
        <h1 class="text-3xl font-bold">
          {{ mode === 'create' ? 'Create New Course' : 'Edit Course' }}
        </h1>
        <p class="text-muted-foreground mt-1">
          {{ mode === 'create' ? 'Add a new course to your catalog' : 'Update your course content and materials' }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" @click="$emit('save-draft')">Save Draft</Button>
        <Button variant="primary" @click="$emit('submit')">
          {{ mode === 'create' ? 'Create Course' : 'Update Course' }}
        </Button>
      </div>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="animate-spin i-heroicons-arrow-path h-8 w-8 text-primary" />
    </div>

    <div v-else class="flex gap-6">
      <!-- Sidebar Navigation -->
      <Card class="w-64 h-fit">
        <nav class="p-2">
          <div class="space-y-0.5">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="handleSectionChange(tab.id)"
              :class="[
                'group relative w-full flex items-center gap-x-3 rounded-lg p-3 text-sm font-medium transition-colors',
                activeSection === tab.id
                  ? 'bg-primary/10 text-primary border-l-2 border-primary'
                  : 'text-foreground hover:bg-muted',
                isStepCompleted(tab.id) && 'bg-muted/50'
              ]"
            >
              <Icon :name="tab.icon" class="h-5 w-5 shrink-0" :class="{'text-primary': activeSection === tab.id}" />
              <div class="flex flex-col min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <span class="truncate">{{ tab.label }}</span>
                  <Badge 
                    :variant="tab.badge === 'Required' ? 'destructive' : (tab.badge === 'Optional' ? 'secondary' : 'default')"
                    class="text-[10px] h-4"
                  >
                    {{ tab.badge }}
                  </Badge>
                  <Icon
                    v-if="isStepCompleted(tab.id)"
                    name="heroicons:check-circle"
                    class="h-4 w-4 text-success shrink-0"
                  />
                </div>
                <span 
                  :class="[
                    activeSection === tab.id
                      ? 'text-primary/80'
                      : 'text-muted-foreground',
                    'text-xs font-normal truncate w-full text-left'
                  ]"
                >
                  {{ tab.description }}
                </span>
              </div>
            </button>
          </div>
        </nav>
      </Card>

      <!-- Main Content -->
      <Card class="flex-1 p-6">
        <div v-show="activeSection === 'info'">
          <slot name="info" />
        </div>

        <div v-show="activeSection === 'modules'">
          <slot name="modules" />
        </div>

        <div v-show="activeSection === 'materials'">
          <slot name="materials" />
        </div>

        <div v-show="activeSection === 'review'">
          <slot name="review" />
        </div>
      </Card>
    </div>
  </div>
</template> 