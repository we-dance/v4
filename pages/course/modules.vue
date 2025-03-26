<script setup lang="ts">
import { z } from 'zod'
import type { Module, Lesson } from '~/types/course'
import type { CourseVideo } from '~/schemas/courseVideo'
import { toast } from 'vue-sonner'

const modules = ref<Module[]>([])
const isLoading = ref(true)
const isSaving = ref(false)

// Load modules from API
onMounted(async () => {
  try {
    isLoading.value = true
    // Replace with your actual API call
    const response = await fetch('/api/course/modules')
    modules.value = await response.json()
  } catch (error) {
    toast.error('Failed to load course modules')
    console.error('Error loading modules:', error)
  } finally {
    isLoading.value = false
  }
})

const handleModulesUpdate = async (updatedModules: Module[]) => {
  try {
    isSaving.value = true

    // Validate modules structure
    const LessonSchema = z.object({
      id: z.string(),
      title: z.string().min(1, 'Lesson title is required'),
      description: z.string(),
      videoUrl: z.string()
    })

    const ModuleSchema = z.object({
      id: z.string(),
      title: z.string().min(1, 'Title is required'),
      description: z.string(),
      lessons: z.array(LessonSchema).min(1, 'At least one lesson is required')
    })

    const ModulesSchema = z.array(ModuleSchema).min(1, 'At least one module is required')

    // This will throw if validation fails
    ModulesSchema.parse(updatedModules)

    // Replace with your actual API call
    await fetch('/api/course/modules', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedModules)
    })
    
    modules.value = updatedModules
    toast.success('Course modules saved successfully')
  } catch (error) {
    if (error instanceof z.ZodError) {
      toast.error('Validation failed: ' + error.errors[0].message)
    } else {
      toast.error('Failed to update course modules')
      console.error('Error updating modules:', error)
    }
  } finally {
    isSaving.value = false
  }
}

const handleVideoUpload = async (moduleId: string, video: CourseVideo) => {
  try {
    // Replace with your actual API call
    await fetch('/api/course/modules/' + moduleId + '/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(video)
    })
    
    const moduleIndex = modules.value.findIndex(m => m.id === moduleId)
    if (moduleIndex !== -1) {
      modules.value[moduleIndex].videos = modules.value[moduleIndex].videos || []
      modules.value[moduleIndex].videos.push(video)
    }
    
    toast.success('Video uploaded successfully')
  } catch (error) {
    toast.error('Failed to save video details')
    console.error('Error uploading video:', error)
  }
}

const handleVideoDelete = async (moduleId: string, videoId: string) => {
  try {
    // Replace with your actual API call
    await fetch('/api/course/modules/' + moduleId + '/videos/' + videoId, {
      method: 'DELETE'
    })
    
    const moduleIndex = modules.value.findIndex(m => m.id === moduleId)
    if (moduleIndex !== -1 && modules.value[moduleIndex].videos) {
      modules.value[moduleIndex].videos = modules.value[moduleIndex].videos.filter(v => v.id !== videoId)
    }
    
    toast.success('Video deleted successfully')
  } catch (error) {
    toast.error('Failed to delete video')
    console.error('Error deleting video:', error)
  }
}
</script>

<template>
  <div class="container mx-auto py-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold">Course Modules</h1>
        <p class="text-muted-foreground mt-1">
          Organize your course content into modules and lessons
        </p>
      </div>
      <Button variant="outline" class="gap-2" asChild>
        <NuxtLink to="/course">
          <div class="i-heroicons-arrow-left h-4 w-4" />
          Back to Course
        </NuxtLink>
      </Button>
    </div>

    <Card class="p-6">
      <CardContent>
        <div v-if="isLoading" class="flex justify-center py-8">
          <Spinner class="h-8 w-8" />
        </div>
        <div v-else>
          <ModuleEditor
            :initial-modules="modules"
            @update:modules="handleModulesUpdate"
            @video-upload="handleVideoUpload"
            @video-delete="handleVideoDelete"
          />
          <p class="text-sm text-muted-foreground mt-4">
            * Drag modules and lessons to reorder them using the grip handles
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 