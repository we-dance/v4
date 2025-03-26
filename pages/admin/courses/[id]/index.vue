<script setup lang="ts">
import { ref } from 'vue'
import type { CourseFormData } from '~/schemas/courseForm'

definePageMeta({
  layout: 'admin',
  validate: (route) => {
    return route.params.id === 'create' || !isNaN(Number(route.params.id))
  }
})

const router = useRouter()
const route = useRoute()
const toast = useToast()

const steps = [
  {
    id: 'course-info',
    name: 'Course Info',
    icon: 'lucide:info',
    description: 'Basic course information'
  },
  {
    id: 'course-content',
    name: 'Course Content',
    icon: 'lucide:book-open',
    description: 'Lessons and modules'
  },
  {
    id: 'review',
    name: 'Review & Publish',
    icon: 'lucide:check-circle',
    description: 'Review and publish course'
  }
]

const currentStep = ref(steps[0].id)

// TODO: Replace with actual API call to get course data
const isNewCourse = route.params.id === 'create'
const courseData = ref<CourseFormData | null>(null)

// Load course data if editing
if (!isNewCourse) {
  // TODO: Load course data using tRPC
  // For now using mock data
  courseData.value = {
    name: 'Example Course',
    description: 'Example description',
    instructorName: 'John Doe',
    price: 49
  }
}

const handleSave = async (data: CourseFormData) => {
  try {
    // TODO: Implement course saving logic using tRPC
    toast.success('Course saved successfully!')
    if (isNewCourse) {
      // After saving, move to the next step
      const currentIndex = steps.findIndex(step => step.id === currentStep.value)
      if (currentIndex < steps.length - 1) {
        currentStep.value = steps[currentIndex + 1].id
      }
    }
  } catch (error) {
    toast.error('Failed to save course')
    console.error(error)
  }
}

const handleCancel = () => {
  router.push('/admin/courses')
}

const handleStepChange = (stepId: string) => {
  currentStep.value = stepId
}

const handlePublish = async () => {
  try {
    // TODO: Implement course publishing logic
    toast.success('Course published successfully!')
    router.push('/admin/courses')
  } catch (error) {
    toast.error('Failed to publish course')
    console.error(error)
  }
}
</script>

<template>
  <div class="container py-6">
    <div class="flex items-center gap-4 mb-6">
      <Button variant="ghost" size="icon" @click="handleCancel">
        <Icon name="lucide:arrow-left" class="h-4 w-4" />
      </Button>
      <div>
        <h1 class="text-3xl font-bold">
          {{ isNewCourse ? 'Create New Course' : 'Edit Course' }}
        </h1>
        <p class="text-muted-foreground mt-1">
          {{ isNewCourse ? 'Add a new course to your catalog' : 'Update your course details' }}
        </p>
      </div>
    </div>

    <div class="flex gap-6">
      <!-- Sidebar Navigation -->
      <Card class="w-64 h-fit">
        <nav class="p-2">
          <ul class="space-y-1">
            <li v-for="step in steps" :key="step.id">
              <button
                class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm"
                :class="{
                  'bg-primary text-primary-foreground': currentStep === step.id,
                  'hover:bg-accent': currentStep !== step.id
                }"
                @click="handleStepChange(step.id)"
              >
                <Icon :name="step.icon" class="h-4 w-4" />
                <span>{{ step.name }}</span>
              </button>
            </li>
          </ul>
        </nav>
      </Card>

      <!-- Main Content -->
      <Card class="flex-1 p-6">
        <div v-if="currentStep === 'course-info'">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-lg font-semibold">Course Information</h2>
              <p class="text-sm text-muted-foreground">
                Fill in the basic information about your course
              </p>
            </div>
          </div>
          <CourseForm
            :initial-data="courseData"
            :submit-label="isNewCourse ? 'Save & Continue' : 'Save Changes'"
            @submit="handleSave"
            @cancel="handleCancel"
          />
        </div>

        <div v-else-if="currentStep === 'course-content'">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-lg font-semibold">Course Content</h2>
              <p class="text-sm text-muted-foreground">
                Organize your course content into modules and lessons
              </p>
            </div>
          </div>
          <!-- TODO: Add CourseContentForm component -->
          <div class="text-center py-12 text-muted-foreground">
            Course content editor coming soon...
          </div>
        </div>

        <div v-else-if="currentStep === 'review'">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-lg font-semibold">Review & Publish</h2>
              <p class="text-sm text-muted-foreground">
                Review your course details before publishing
              </p>
            </div>
          </div>
          <!-- TODO: Add CourseReview component -->
          <div class="space-y-6">
            <div class="text-center py-12 text-muted-foreground">
              Course review page coming soon...
            </div>
            <div class="flex justify-end gap-4">
              <Button variant="outline" @click="handleCancel">
                Save as Draft
              </Button>
              <Button @click="handlePublish">
                Publish Course
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template> 