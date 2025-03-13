<template>
  <div class="container py-6 space-y-6">
    <div class="flex items-center gap-4">
      <Button variant="ghost" asChild>
        <NuxtLink to="/admin/courses">
          <Icon name="chevron-left" class="w-4 h-4 mr-2" />
          Back
        </NuxtLink>
      </Button>
      <h1 class="text-3xl font-bold">Create Course</h1>
    </div>

    <Card class="max-w-2xl">
      <CardHeader>
        <CardTitle>Course Details</CardTitle>
        <CardDescription>
          Fill in the course details below. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="space-y-4">
          <div class="space-y-2">
            <Label for="name">Course Name</Label>
            <Input id="name" v-model="form.name" required />
          </div>

          <div class="space-y-2">
            <Label for="description">Description</Label>
            <Textarea id="description" v-model="form.description" required />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="price">Monthly Price</Label>
              <Input
                id="price"
                v-model="form.offers[0].price"
                type="number"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div class="space-y-2">
              <Label for="educationalLevel">Level</Label>
              <Select v-model="form.educationalLevel">
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="teaches">Dance Style</Label>
            <Input
              id="teaches"
              v-model="form.teaches[0].name"
              placeholder="e.g. Salsa, Bachata"
              required
            />
          </div>

          <div class="space-y-2">
            <Label for="instructor">Instructor Name</Label>
            <Input id="instructor" v-model="form.instructor.name" required />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="privatePrice">Private Class Price</Label>
              <Input
                id="privatePrice"
                v-model="form.instructor.availableService.offers[0].price"
                type="number"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div class="space-y-2">
              <Label for="privateDuration"
                >Private Class Duration (minutes)</Label
              >
              <Input
                id="privateDuration"
                v-model="form.instructor.availableService.offers[0].duration"
                type="text"
                pattern="PT\d+M"
                placeholder="PT60M"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <Label>Course Materials</Label>
            <div class="border rounded-lg p-4 space-y-4">
              <div v-if="form.hasPart.length" class="space-y-4">
                <div
                  v-for="(module, moduleIndex) in form.hasPart"
                  :key="module.identifier"
                  class="space-y-2"
                >
                  <div class="font-medium">{{ module.name }}</div>
                  <div
                    v-for="(lesson, lessonIndex) in module.hasPart"
                    :key="lesson.identifier"
                    class="flex items-center justify-between p-2 bg-muted rounded"
                  >
                    <div class="flex items-center gap-2">
                      <Icon
                        :name="lesson.video.playbackId ? 'video' : 'file'"
                        class="w-4 h-4"
                      />
                      <span>{{ lesson.name }}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      @click="removeMaterial(moduleIndex, lessonIndex)"
                    >
                      <Icon name="trash" class="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <Input
                  type="file"
                  accept="video/*,.pdf,.doc,.docx"
                  @change="handleFileUpload"
                  :disabled="isUploading"
                />
                <div v-if="isUploading" class="animate-spin">
                  <Icon name="loader" class="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-4">
            <Button type="button" variant="ghost" asChild>
              <NuxtLink to="/admin/courses">Cancel</NuxtLink>
            </Button>
            <Button type="submit" :disabled="isUploading">
              Create Course
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { Course } from '~/schemas/course'

definePageMeta({
  layout: 'admin',
})

interface Material {
  '@type': 'VideoObject' | 'DigitalDocument'
  identifier: string
  name: string
  uploadDate: string
  contentUrl: string
  playbackId?: string
}

interface CourseForm {
  name: string
  description: string
  teaches: Array<{ name: string }>
  educationalLevel: string
  timeRequired: string
  numberOfLessons: number
  instructor: {
    '@type': 'Person'
    name: string
    availableService: {
      offers: Array<{
        price: number
        priceCurrency: string
        duration: string
      }>
    }
  }
  offers: Array<{
    price: number
    priceCurrency: string
    duration?: string
  }>
  hasPart: Array<{
    '@type': 'Course'
    identifier: string
    name: string
    hasPart: Array<{
      '@type': 'Lesson'
      identifier: string
      name: string
      timeRequired: string
      video: {
        playbackId?: string
        identifier?: string
      }
      completed: boolean
      locked: boolean
    }>
  }>
  review: Array<{
    '@type': 'Review'
    identifier: number
    reviewRating: {
      '@type': 'Rating'
      ratingValue: number
      bestRating: number
      worstRating: number
    }
    author: {
      '@type': 'Person'
      name: string
    }
    reviewBody: string
    datePublished: string
  }>
  aggregateRating: {
    '@type': 'AggregateRating'
    ratingValue: number
    reviewCount: number
    ratingCount: number
  }
}

const form = ref<CourseForm>({
  name: '',
  description: '',
  teaches: [{ name: '' }],
  educationalLevel: 'Beginner',
  timeRequired: '4 weeks',
  numberOfLessons: 0,
  instructor: {
    '@type': 'Person',
    name: '',
    availableService: {
      offers: [
        {
          price: 0,
          priceCurrency: 'EUR',
          duration: 'PT60M',
        },
      ],
    },
  },
  offers: [
    {
      price: 0,
      priceCurrency: 'EUR',
      duration: 'P1M',
    },
  ],
  hasPart: [],
  review: [],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 0,
    reviewCount: 0,
    ratingCount: 0,
  },
})

const isUploading = ref(false)
const router = useRouter()

async function onSubmit(event: Event) {
  event.preventDefault()

  try {
    // TODO: Implement course creation API call
    console.log('Creating course:', form.value)

    // Navigate back to courses list
    router.push('/admin/courses')
  } catch (error) {
    console.error('Error saving course:', error)
  }
}

async function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  isUploading.value = true

  try {
    // TODO: Implement file upload logic
    const file = input.files[0]
    console.log('Uploading file:', file)

    const material: Material = {
      '@type': file.type.includes('video') ? 'VideoObject' : 'DigitalDocument',
      identifier: crypto.randomUUID(),
      name: file.name,
      uploadDate: new Date().toISOString(),
      contentUrl: 'temporary-url', // This should be replaced with the actual uploaded file URL
      playbackId: file.type.includes('video')
        ? 'temporary-playback-id'
        : undefined,
    }

    // Add the material as a new module and lesson
    form.value.hasPart.push({
      '@type': 'Course',
      identifier: crypto.randomUUID(),
      name: 'New Module',
      hasPart: [
        {
          '@type': 'Lesson',
          identifier: crypto.randomUUID(),
          name: material.name,
          timeRequired: 'PT30M',
          video: {
            playbackId: material.playbackId,
            identifier: material.identifier,
          },
          completed: false,
          locked: false,
        },
      ],
    })

    form.value.numberOfLessons = form.value.hasPart.reduce(
      (acc, module) => acc + module.hasPart.length,
      0
    )
  } catch (error) {
    console.error('Error uploading file:', error)
  } finally {
    isUploading.value = false
  }
}

function removeMaterial(moduleIndex: number, lessonIndex: number) {
  form.value.hasPart[moduleIndex].hasPart.splice(lessonIndex, 1)
  if (form.value.hasPart[moduleIndex].hasPart.length === 0) {
    form.value.hasPart.splice(moduleIndex, 1)
  }
  form.value.numberOfLessons = form.value.hasPart.reduce(
    (acc, module) => acc + module.hasPart.length,
    0
  )
}
</script>
