<script setup lang="ts">
import { toast } from 'vue-sonner'
import { z } from 'zod'
import type { CourseFormData } from '~/schemas/course'

const router = useRouter()
const isSubmitting = ref(false)
const currentStep = ref(0)

const steps = [
  { title: 'Basic Info', icon: 'lucide:book', description: 'Course title, description, and learning objectives' },
  { title: 'Media', icon: 'lucide:image', description: 'Course cover image and preview video' },
  { title: 'Pricing', icon: 'lucide:credit-card', description: 'Course pricing and enrollment details' },
  { title: 'Preview', icon: 'lucide:eye', description: 'Review your course before publishing' }
]

const schema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  educationalLevel: z.enum(['Beginner', 'Intermediate', 'Advanced', 'All Levels']),
  courseMode: z.enum(['Online', 'In Person', 'Hybrid']),
  language: z.string(),
  image: z.any().nullable(),
  previewVideo: z.any().nullable(),
  price: z.number().min(0),
  currency: z.string(),
  duration: z.string(),
  maxStudents: z.number().min(1),
  schedule: z.string(),
  prerequisites: z.string(),
  whatToLearn: z.array(z.string().min(1, 'Learning point cannot be empty'))
})

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

const errors = ref<Record<string, string>>({})

const validateCurrentStep = () => {
  errors.value = {}
  const currentFields = {
    0: ['title', 'description', 'educationalLevel', 'courseMode', 'whatToLearn'],
    1: ['image'],
    2: ['price', 'currency', 'duration', 'maxStudents'],
    3: []
  }[currentStep.value]

  if (!currentFields) return true

  const fieldsToValidate = {} as any
  currentFields.forEach(field => {
    fieldsToValidate[field] = form.value[field as keyof typeof form.value]
  })

  try {
    schema.pick(currentFields as [keyof typeof form.value]).parse(fieldsToValidate)
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        errors.value[err.path[0]] = err.message
      })
    }
    return false
  }
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    const file = input.files[0]
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }
    form.value.image = file
  }
}

const handleVideoUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    const file = input.files[0]
    if (file.size > 50 * 1024 * 1024) {
      toast.error('Video size must be less than 50MB')
      return
    }
    form.value.previewVideo = file
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
  if (validateCurrentStep() && currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const isLastStep = computed(() => currentStep.value === steps.length - 1)

const progressPercentage = computed(() => {
  return Math.round((currentStep.value / (steps.length - 1)) * 100)
})
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
          <div>
            <h1 class="text-2xl font-bold">Create New Course</h1>
            <p class="text-muted-foreground mt-1">
              {{ steps[currentStep].description }}
            </p>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex justify-between relative">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex flex-col items-center flex-1 relative z-10"
          >
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-200"
              :class="[
                currentStep === index ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                currentStep > index ? 'bg-green-500 text-white' :
                'bg-muted text-muted-foreground'
              ]"
            >
              <Icon :name="step.icon" class="w-5 h-5" />
            </div>
            <span 
              class="text-sm text-center transition-colors duration-200" 
              :class="{ 
                'text-primary font-medium': currentStep === index,
                'text-green-500': currentStep > index,
                'text-muted-foreground': currentStep < index
              }"
            >
              {{ step.title }}
            </span>
          </div>
          <div class="absolute top-5 left-0 w-full h-[2px] bg-muted -z-0">
            <div
              class="h-full bg-primary transition-all duration-300 ease-in-out"
              :style="{ width: `${progressPercentage}%` }"
            />
          </div>
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
              :error="errors.title"
            />

            <FormField
              v-model="form.description"
              name="description"
              label="Description"
              type="textarea"
              placeholder="Describe what your course is about"
              required
              :error="errors.description"
              help="Write a compelling description that will make students want to take your course"
            />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                v-model="form.educationalLevel"
                name="level"
                label="Level"
                type="select"
                :options="['Beginner', 'Intermediate', 'Advanced', 'All Levels']"
                :error="errors.educationalLevel"
              />

              <FormField
                v-model="form.courseMode"
                name="mode"
                label="Course Mode"
                type="select"
                :options="['Online', 'In Person', 'Hybrid']"
                :error="errors.courseMode"
              />
            </div>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <Label class="font-medium">What students will learn</Label>
                <Button
                  variant="outline"
                  size="sm"
                  @click="addLearningPoint"
                >
                  <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
                  Add Learning Point
                </Button>
              </div>
              <div
                v-for="(point, index) in form.whatToLearn"
                :key="index"
                class="flex gap-2"
              >
                <div class="flex-1">
                  <Input
                    v-model="form.whatToLearn[index]"
                    placeholder="e.g., Master basic salsa steps"
                    :class="{ 'border-destructive': errors.whatToLearn?.[index] }"
                  />
                  <span v-if="errors.whatToLearn?.[index]" class="text-sm text-destructive mt-1">
                    {{ errors.whatToLearn[index] }}
                  </span>
                </div>
                <Button
                  v-if="form.whatToLearn.length > 1"
                  variant="outline"
                  size="icon"
                  @click="removeLearningPoint(index)"
                >
                  <Icon name="lucide:minus" class="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div v-if="currentStep === 1" class="space-y-8">
            <div class="space-y-4">
              <Label class="font-medium">Course Cover Image</Label>
              <div 
                class="border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200"
                :class="{ 'border-destructive': errors.image }"
              >
                <div v-if="form.image" class="mb-4">
                  <img
                    :src="URL.createObjectURL(form.image)"
                    alt="Preview"
                    class="max-h-48 mx-auto rounded-lg shadow-sm"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    class="mt-2"
                    @click="form.image = null"
                  >
                    <Icon name="lucide:trash" class="w-4 h-4 mr-2" />
                    Remove Image
                  </Button>
                </div>
                <div v-else class="space-y-2">
                  <div class="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                    <Icon name="lucide:upload" class="w-6 h-6 text-muted-foreground" />
                  </div>
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
              <span v-if="errors.image" class="text-sm text-destructive">
                {{ errors.image }}
              </span>
            </div>

            <div class="space-y-4">
              <Label class="font-medium">Preview Video (Optional)</Label>
              <div class="border-2 border-dashed rounded-lg p-8 text-center">
                <div v-if="form.previewVideo" class="mb-4">
                  <video
                    :src="URL.createObjectURL(form.previewVideo)"
                    controls
                    class="max-h-48 mx-auto rounded-lg shadow-sm"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    class="mt-2"
                    @click="form.previewVideo = null"
                  >
                    <Icon name="lucide:trash" class="w-4 h-4 mr-2" />
                    Remove Video
                  </Button>
                </div>
                <div v-else class="space-y-2">
                  <div class="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                    <Icon name="lucide:video" class="w-6 h-6 text-muted-foreground" />
                  </div>
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
                :error="errors.price"
                help="Set a competitive price for your course"
              />

              <FormField
                v-model="form.currency"
                name="currency"
                label="Currency"
                type="select"
                :options="['USD', 'EUR', 'GBP']"
                :error="errors.currency"
              />
            </div>

            <FormField
              v-model="form.maxStudents"
              name="maxStudents"
              label="Maximum Students"
              type="number"
              min="1"
              placeholder="20"
              :error="errors.maxStudents"
              help="Leave empty for unlimited students"
            />

            <FormField
              v-model="form.duration"
              name="duration"
              label="Course Duration"
              placeholder="e.g., 6 weeks"
              :error="errors.duration"
              help="How long will it take to complete the course?"
            />

            <FormField
              v-model="form.schedule"
              name="schedule"
              label="Schedule"
              type="textarea"
              placeholder="Describe the course schedule"
              :error="errors.schedule"
              help="Specify class times, frequency, or self-paced structure"
            />
          </div>

          <div v-if="currentStep === 3" class="space-y-8">
            <div class="bg-muted rounded-lg p-8">
              <h3 class="text-lg font-medium mb-6 flex items-center gap-2">
                <Icon name="lucide:check-circle" class="w-5 h-5 text-green-500" />
                Course Preview
              </h3>
              
              <div class="space-y-6">
                <div class="flex items-start gap-6">
                  <div v-if="form.image" class="w-32 h-32 rounded-lg overflow-hidden bg-muted shrink-0">
                    <img
                      :src="URL.createObjectURL(form.image)"
                      alt="Course cover"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-xl font-medium mb-2 truncate">{{ form.title || 'Course Title' }}</h4>
                    <p class="text-muted-foreground line-clamp-2">
                      {{ form.description || 'Course description' }}
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <h5 class="font-medium">Course Details</h5>
                    <div class="space-y-1 text-sm">
                      <p class="flex items-center gap-2">
                        <Icon name="lucide:book" class="w-4 h-4 text-muted-foreground" />
                        <span class="text-muted-foreground">Level:</span>
                        {{ form.educationalLevel }}
                      </p>
                      <p class="flex items-center gap-2">
                        <Icon name="lucide:users" class="w-4 h-4 text-muted-foreground" />
                        <span class="text-muted-foreground">Mode:</span>
                        {{ form.courseMode }}
                      </p>
                      <p class="flex items-center gap-2">
                        <Icon name="lucide:clock" class="w-4 h-4 text-muted-foreground" />
                        <span class="text-muted-foreground">Duration:</span>
                        {{ form.duration }}
                      </p>
                    </div>
                  </div>

                  <div class="space-y-2">
                    <h5 class="font-medium">Enrollment</h5>
                    <div class="space-y-1 text-sm">
                      <p class="flex items-center gap-2">
                        <Icon name="lucide:credit-card" class="w-4 h-4 text-muted-foreground" />
                        <span class="text-muted-foreground">Price:</span>
                        {{ form.price }} {{ form.currency }}
                      </p>
                      <p class="flex items-center gap-2">
                        <Icon name="lucide:users" class="w-4 h-4 text-muted-foreground" />
                        <span class="text-muted-foreground">Max Students:</span>
                        {{ form.maxStudents }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="space-y-2">
                  <h5 class="font-medium">What you'll learn</h5>
                  <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li
                      v-for="(point, index) in form.whatToLearn"
                      :key="index"
                      class="flex items-start gap-2 text-sm"
                    >
                      <Icon name="lucide:check" class="w-4 h-4 text-green-500 mt-0.5" />
                      <span>{{ point }}</span>
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
  margin-top: 2rem;
}

:deep(.form-field) {
  margin-bottom: 1.5rem;
}

:deep(.input),
:deep(.select) {
  height: 2.75rem;
  padding: 0.625rem 1rem;
}

:deep(.textarea) {
  min-height: 6rem;
  padding: 0.75rem 1rem;
}
</style> 