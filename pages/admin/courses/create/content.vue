<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { courseModuleSchema, type CourseModule } from '~/schemas/courseModule'
import { courseVideoSchema, type CourseVideo } from '~/schemas/courseVideo'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#components'
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
import { Progress } from '#components'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#components'
import { Textarea } from '#components'
import { DragHandleDots2Icon } from '@radix-ui/react-icons'

definePageMeta({
  layout: 'admin'
})

// Module form schema
const moduleFormSchema = z.object({
  name: z.string()
    .min(3, 'Module name must be at least 3 characters')
    .max(100, 'Module name must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
})

// Video form schema
const videoFormSchema = z.object({
  name: z.string()
    .min(3, 'Video name must be at least 3 characters')
    .max(100, 'Video name must be less than 100 characters'),
  description: z.string()
    .max(200, 'Description must be less than 200 characters')
    .optional()
})

// State
const isModuleDialogOpen = ref(false)
const modules = ref<CourseModule[]>([])
const uploadingVideos = ref<Map<string, { status: 'uploading' | 'processing' | 'ready', progress: number }>>(new Map())

// Module form
const moduleForm = useForm({
  validationSchema: toTypedSchema(moduleFormSchema),
  initialValues: {
    name: '',
    description: ''
  }
})

// Handle module creation
const handleModuleCreate = moduleForm.handleSubmit((values) => {
  modules.value.push({
    id: crypto.randomUUID(),
    name: values.name,
    description: values.description,
    videos: []
  })
  isModuleDialogOpen.value = false
  moduleForm.resetForm()
})

// Handle module reordering
const handleModuleReorder = (event: any) => {
  const { oldIndex, newIndex } = event
  const modulesCopy = [...modules.value]
  const [movedModule] = modulesCopy.splice(oldIndex, 1)
  modulesCopy.splice(newIndex, 0, movedModule)
  modules.value = modulesCopy
}

// Handle video reordering within a module
const handleVideoReorder = (moduleId: string, event: any) => {
  const { oldIndex, newIndex } = event
  const module = modules.value.find(m => m.id === moduleId)
  if (!module) return

  const videosCopy = [...module.videos]
  const [movedVideo] = videosCopy.splice(oldIndex, 1)
  videosCopy.splice(newIndex, 0, movedVideo)
  module.videos = videosCopy
}

// Handle video upload
const handleVideoUpload = async (moduleId: string, event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  const uploadId = crypto.randomUUID()
  
  // Add to uploading videos map
  uploadingVideos.value.set(uploadId, {
    status: 'uploading',
    progress: 0
  })

  try {
    // TODO: Implement actual video upload to Mux
    // Simulating upload and processing for now
    await new Promise(resolve => setTimeout(resolve, 2000))
    uploadingVideos.value.set(uploadId, {
      status: 'processing',
      progress: 100
    })

    await new Promise(resolve => setTimeout(resolve, 1500))
    uploadingVideos.value.set(uploadId, {
      status: 'ready',
      progress: 100
    })

    // Add video to module
    const module = modules.value.find(m => m.id === moduleId)
    if (module) {
      module.videos.push({
        id: uploadId,
        name: file.name,
        description: '',
        duration: 0,
        url: '',
        thumbnailUrl: ''
      })
    }
  } catch (error) {
    console.error('Upload failed:', error)
    uploadingVideos.value.delete(uploadId)
  }
}

// Update video details
const updateVideoDetails = (moduleId: string, videoId: string, data: Partial<CourseVideo>) => {
  const module = modules.value.find(m => m.id === moduleId)
  if (!module) return

  const video = module.videos.find(v => v.id === videoId)
  if (!video) return

  Object.assign(video, data)
}
</script>

<template>
  <div class="container max-w-4xl py-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Course Content</h1>
        <p class="text-muted-foreground mt-2">
          Organize your course content into modules and upload videos
        </p>
      </div>
      <Button @click="isModuleDialogOpen = true">
        <Icon name="heroicons:plus" class="h-4 w-4 mr-2" />
        Add Module
      </Button>
    </div>

    <!-- Module List -->
    <div v-if="modules.length" class="space-y-6">
      <draggable
        v-model="modules"
        item-key="id"
        handle=".module-handle"
        @end="handleModuleReorder"
      >
        <template #item="{ element: module }">
          <Card class="mb-4">
            <CardHeader class="flex flex-row items-center gap-4">
              <button class="module-handle cursor-move">
                <Icon name="lucide:grip-vertical" class="h-5 w-5 text-muted-foreground" />
              </button>
              <div class="flex-1">
                <CardTitle>{{ module.name }}</CardTitle>
                <CardDescription>{{ module.description }}</CardDescription>
              </div>
              <div class="flex items-center gap-2">
                <label class="cursor-pointer">
                  <Input
                    type="file"
                    accept="video/*"
                    class="hidden"
                    @change="(e) => handleVideoUpload(module.id, e)"
                  />
                  <Button variant="outline" type="button">
                    <Icon name="heroicons:video-camera" class="h-4 w-4 mr-2" />
                    Add Video
                  </Button>
                </label>
              </div>
            </CardHeader>
            <CardContent>
              <!-- Videos List -->
              <draggable
                v-model="module.videos"
                item-key="id"
                handle=".video-handle"
                class="space-y-3"
                @end="(e) => handleVideoReorder(module.id, e)"
              >
                <template #item="{ element: video }">
                  <div class="flex items-start gap-4 p-4 rounded-lg border bg-card">
                    <button class="video-handle cursor-move mt-1">
                      <Icon name="lucide:grip-vertical" class="h-5 w-5 text-muted-foreground" />
                    </button>
                    
                    <!-- Video Status -->
                    <div v-if="uploadingVideos.get(video.id)" class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <div class="animate-pulse">
                          <Icon 
                            :name="uploadingVideos.get(video.id)?.status === 'uploading' 
                              ? 'heroicons:arrow-up-circle'
                              : uploadingVideos.get(video.id)?.status === 'processing'
                                ? 'heroicons:cog-6-tooth'
                                : 'heroicons:check-circle'"
                            class="h-5 w-5 text-primary"
                          />
                        </div>
                        <span class="font-medium capitalize">
                          {{ uploadingVideos.get(video.id)?.status }}
                        </span>
                        <Progress 
                          :value="uploadingVideos.get(video.id)?.progress" 
                          class="w-24"
                        />
                      </div>
                      <p class="text-xs text-muted-foreground">
                        Securely hosted via Mux
                      </p>
                    </div>

                    <!-- Video Details Form -->
                    <div v-else class="flex-1 space-y-4">
                      <FormField
                        v-slot="{ errorMessage }"
                        :name="`video-${video.id}-name`"
                        :rules="videoFormSchema.shape.name"
                      >
                        <FormItem>
                          <FormControl>
                            <Input
                              v-model="video.name"
                              placeholder="Video title"
                              :class="{ 'border-destructive': errorMessage }"
                            />
                          </FormControl>
                          <FormMessage>{{ errorMessage }}</FormMessage>
                        </FormItem>
                      </FormField>

                      <FormField
                        v-slot="{ errorMessage }"
                        :name="`video-${video.id}-description`"
                        :rules="videoFormSchema.shape.description"
                      >
                        <FormItem>
                          <FormControl>
                            <Textarea
                              v-model="video.description"
                              placeholder="Short description (optional)"
                              rows="2"
                              :class="{ 'border-destructive': errorMessage }"
                            />
                          </FormControl>
                          <FormMessage>{{ errorMessage }}</FormMessage>
                        </FormItem>
                      </FormField>
                    </div>

                    <Button 
                      v-if="!uploadingVideos.get(video.id)"
                      variant="ghost"
                      size="icon"
                      class="text-destructive"
                      @click="module.videos = module.videos.filter(v => v.id !== video.id)"
                    >
                      <Icon name="heroicons:trash" class="h-4 w-4" />
                    </Button>
                  </div>
                </template>
              </draggable>

              <div v-if="!module.videos.length" class="text-center py-8 text-muted-foreground">
                <Icon name="heroicons:video-camera" class="h-8 w-8 mx-auto mb-2" />
                <p>No videos yet. Click "Add Video" to get started.</p>
              </div>
            </CardContent>
          </Card>
        </template>
      </draggable>
    </div>

    <div v-else class="text-center py-12 border-2 border-dashed rounded-lg">
      <Icon name="heroicons:squares-2x2" class="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
      <h3 class="text-lg font-medium mb-2">No Modules Yet</h3>
      <p class="text-muted-foreground mb-4">
        Start by adding your first module to organize your course content
      </p>
      <Button @click="isModuleDialogOpen = true">
        <Icon name="heroicons:plus" class="h-4 w-4 mr-2" />
        Add First Module
      </Button>
    </div>

    <!-- Add Module Dialog -->
    <Dialog v-model:open="isModuleDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Module</DialogTitle>
          <DialogDescription>
            Create a new module to organize your course content
          </DialogDescription>
        </DialogHeader>
        
        <form @submit.prevent="handleModuleCreate" class="space-y-4">
          <FormField
            v-slot="{ field, errorMessage }"
            :name="'name'"
            v-model="moduleForm.values.name"
          >
            <FormItem>
              <FormLabel>Module Name</FormLabel>
              <FormControl>
                <Input
                  v-bind="field"
                  placeholder="e.g., Introduction to Basic Steps"
                  :class="{ 'border-destructive': errorMessage }"
                />
              </FormControl>
              <FormMessage>{{ errorMessage }}</FormMessage>
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ field, errorMessage }"
            :name="'description'"
            v-model="moduleForm.values.description"
          >
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  v-bind="field"
                  placeholder="Brief overview of what students will learn in this module"
                  :class="{ 'border-destructive': errorMessage }"
                  rows="3"
                />
              </FormControl>
              <FormMessage>{{ errorMessage }}</FormMessage>
            </FormItem>
          </FormField>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              @click="isModuleDialogOpen = false"
            >
              Cancel
            </Button>
            <Button type="submit">Create Module</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template> 