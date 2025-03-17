<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { CourseFormData } from '~/schemas/course'

const router = useRouter()
const isSubmitting = ref(false)
const currentStep = ref(0)

const steps = [
  { title: 'Basic Info', icon: 'lucide:book' },
  { title: 'Media', icon: 'lucide:image' },
  { title: 'Pricing', icon: 'lucide:credit-card' },
  { title: 'Preview', icon: 'lucide:eye' }
]

const form = ref({
  title: '',
  description: '',
  educationalLevel: 'Beginner',
  courseMode: 'hybrid',
  language: 'English',
  image: null as File | null,
  previewVideo: null as File | null,
  price: 99,
  currency: 'USD',
  duration: '6 weeks',
  maxStudents: 20,
  schedule: '',
  prerequisites: '',
  whatToLearn: ['']
})

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    form.value.image = input.files[0]
  }
}

const handleVideoUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    form.value.previewVideo = input.files[0]
  }
}

const addLearningPoint = () => {
  form.value.whatToLearn.push('')
}

const removeLearningPoint = (index: number) => {
  form.value.whatToLearn.splice(index, 1)
}

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Course created successfully')
    router.push('/admin/courses')
  } catch (error) {
    toast.error('Failed to create course')
  } finally {
    isSubmitting.value = false
  }
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const isLastStep = computed(() => currentStep.value === steps.length - 1)
</script>

<template>
  <div class="container max-w-3xl mx-auto py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <div class="flex items-center gap-2 mb-2">
          <NuxtLink to="/admin/courses">
            <Button variant="ghost" size="sm">
              <Icon name="lucide:arrow-left" class="w-4 h-4" />
            </Button>
          </NuxtLink>
          <h1 class="text-2xl font-bold">Create New Course</h1>
        </div>
        <p class="text-muted-foreground">
          Fill in the details to create your new dance course
        </p>
      </div>

      <div class="mb-6">
        <div class="flex justify-between">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex flex-col items-center flex-1"
          >
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center mb-2"
              :class="[
                currentStep === index ? 'bg-primary text-primary-foreground' :
                currentStep > index ? 'bg-green-500 text-white' :
                'bg-muted text-muted-foreground'
              ]"
            >
              <Icon :name="step.icon" class="w-4 h-4" />
            </div>
            <span class="text-sm" :class="{ 'text-primary font-medium': currentStep === index }">
              {{ step.title }}
            </span>
          </div>
        </div>
        <div class="relative mt-2">
          <div class="absolute w-full h-1 bg-muted" />
          <div
            class="absolute h-1 bg-primary transition-all duration-300"
            :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"
          />
        </div>
      </div>

      <Card class="mb-6">
        <CardContent class="p-6">
          <div v-if="currentStep === 0" class="space-y-8">
            <FormField
              v-model="form.title"
              name="title"
              label="Course Title"
              placeholder="e.g., Salsa Fundamentals"
              required
            />

            <FormField
              v-model="form.description"
              name="description"
              label="Description"
              type="textarea"
              placeholder="Describe what your course is about"
              required
            />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                v-model="form.educationalLevel"
                name="level"
                label="Level"
                type="select"
                :options="['Beginner', 'Intermediate', 'Advanced', 'All Levels']"
              />

              <FormField
                v-model="form.courseMode"
                name="mode"
                label="Course Mode"
                type="select"
                :options="['Online', 'In Person', 'Hybrid']"
              />
            </div>

            <div class="space-y-4">
              <label class="block font-medium">What students will learn</label>
              <div
                v-for="(point, index) in form.whatToLearn"
                :key="index"
                class="flex gap-2"
              >
                <Input
                  v-model="form.whatToLearn[index]"
                  placeholder="e.g., Master basic salsa steps"
                />
                <Button
                  v-if="form.whatToLearn.length > 1"
                  variant="outline"
                  size="icon"
                  @click="removeLearningPoint(index)"
                >
                  <Icon name="lucide:minus" class="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                @click="addLearningPoint"
              >
                <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
                Add Learning Point
              </Button>
            </div>
          </div>

          <div v-if="currentStep === 1" class="space-y-8">
            <div class="space-y-4">
              <label class="block font-medium">Course Cover Image</label>
              <div class="border-2 border-dashed rounded-lg p-8 text-center">
                <div v-if="form.image" class="mb-4">
                  <img
                    :src="URL.createObjectURL(form.image)"
                    alt="Preview"
                    class="max-h-48 mx-auto"
                  />
                </div>
                <div class="space-y-2">
                  <Icon name="lucide:upload" class="w-8 h-8 mx-auto text-muted-foreground" />
                  <p class="text-sm text-muted-foreground">
                    Drag and drop your image here, or
                    <Button variant="link" class="px-1" @click="$refs.imageInput.click()">
                      browse
                    </Button>
                  </p>
                  <p class="text-xs text-muted-foreground">
                    Recommended: 1280x720px, Max 5MB
                  </p>
                </div>
                <input
                  ref="imageInput"
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="handleImageUpload"
                />
              </div>
            </div>

            <div class="space-y-4">
              <label class="block font-medium">Preview Video</label>
              <div class="border-2 border-dashed rounded-lg p-8 text-center">
                <div v-if="form.previewVideo" class="mb-4">
                  <video
                    :src="URL.createObjectURL(form.previewVideo)"
                    controls
                    class="max-h-48 mx-auto"
                  />
                </div>
                <div class="space-y-2">
                  <Icon name="lucide:video" class="w-8 h-8 mx-auto text-muted-foreground" />
                  <p class="text-sm text-muted-foreground">
                    Upload a preview video of your course
                    <Button variant="link" class="px-1" @click="$refs.videoInput.click()">
                      browse
                    </Button>
                  </p>
                  <p class="text-xs text-muted-foreground">
                    Max duration: 2 minutes, Max size: 50MB
                  </p>
                </div>
                <input
                  ref="videoInput"
                  type="file"
                  class="hidden"
                  accept="video/*"
                  @change="handleVideoUpload"
                />
              </div>
            </div>
          </div>

          <div v-if="currentStep === 2" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                v-model="form.price"
                name="price"
                label="Price"
                type="number"
                min="0"
                placeholder="99"
              />

              <FormField
                v-model="form.currency"
                name="currency"
                label="Currency"
                type="select"
                :options="['USD', 'EUR', 'GBP']"
              />
            </div>

            <FormField
              v-model="form.maxStudents"
              name="maxStudents"
              label="Maximum Students"
              type="number"
              min="1"
              placeholder="20"
            />

            <FormField
              v-model="form.duration"
              name="duration"
              label="Course Duration"
              placeholder="e.g., 6 weeks"
            />

            <FormField
              v-model="form.schedule"
              name="schedule"
              label="Schedule"
              type="textarea"
              placeholder="Describe the course schedule"
            />
          </div>

          <div v-if="currentStep === 3" class="space-y-8">
            <div class="bg-muted rounded-lg p-8">
              <h3 class="text-lg font-medium mb-4">Course Preview</h3>
              
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <div v-if="form.image" class="w-24 h-24 rounded overflow-hidden">
                    <img
                      :src="URL.createObjectURL(form.image)"
                      alt="Course cover"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 class="font-medium">{{ form.title || 'Course Title' }}</h4>
                    <p class="text-sm text-muted-foreground">
                      {{ form.description || 'Course description' }}
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p class="font-medium">Level</p>
                    <p class="text-muted-foreground">{{ form.educationalLevel }}</p>
                  </div>
                  <div>
                    <p class="font-medium">Mode</p>
                    <p class="text-muted-foreground">{{ form.courseMode }}</p>
                  </div>
                  <div>
                    <p class="font-medium">Price</p>
                    <p class="text-muted-foreground">{{ form.price }} {{ form.currency }}</p>
                  </div>
                  <div>
                    <p class="font-medium">Duration</p>
                    <p class="text-muted-foreground">{{ form.duration }}</p>
                  </div>
                </div>

                <div>
                  <p class="font-medium mb-2">What you'll learn</p>
                  <ul class="list-disc list-inside text-sm text-muted-foreground">
                    <li v-for="(point, index) in form.whatToLearn" :key="index">
                      {{ point }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div class="flex justify-between gap-4">
        <Button
          v-if="currentStep > 0"
          variant="outline"
          class="h-11 px-6"
          @click="prevStep"
        >
          <Icon name="lucide:arrow-left" class="w-5 h-5 mr-2" />
          Previous
        </Button>
        <div class="ml-auto">
          <Button
            v-if="!isLastStep"
            class="h-11 px-6"
            @click="nextStep"
          >
            Next
            <Icon name="lucide:arrow-right" class="w-5 h-5 ml-2" />
          </Button>
          <Button
            v-else
            :loading="isSubmitting"
            class="h-11 px-6"
            @click="handleSubmit"
          >
            <Icon name="lucide:check" class="w-5 h-5 mr-2" />
            Create Course
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.space-y-8 > * + * {
  margin-top: 1.5rem;
}

:deep(.form-field) {
  margin-bottom: 1rem;
}

:deep(.input),
:deep(.select) {
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
}
</style> 