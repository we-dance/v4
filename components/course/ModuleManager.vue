<script setup lang="ts">
import { ref } from 'vue'
import type { CourseModule } from '~/schemas/courseModule'
import type { CourseVideo } from '~/schemas/courseVideo'
import { toast } from 'vue-sonner'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { courseModuleSchema } from '~/schemas/courseModule'
import VideoUploader from './VideoUploader.vue'
import type { DragEndEvent } from '@dndkit/core'
import { Icon } from '@iconify/vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#components'

interface DragEndEvent {
  oldIndex: number
  newIndex: number
}

const props = defineProps<{
  modelValue: CourseModule[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modules: CourseModule[]): void
}>()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(courseModuleSchema)
})

const isAddingModule = ref(false)
const editingModuleId = ref<string | null>(null)
const expandedModules = ref<Set<string>>(new Set())
const moduleTitle = ref('')
const moduleDescription = ref('')

const toggleModule = (moduleId: string) => {
  if (expandedModules.value.has(moduleId)) {
    expandedModules.value.delete(moduleId)
  } else {
    expandedModules.value.add(moduleId)
  }
}

const addNewModule = () => {
  const newModule: CourseModule = {
    id: crypto.randomUUID(),
    name: moduleTitle.value,
    description: moduleDescription.value,
    videos: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  emit('update:modelValue', [...props.modelValue, newModule])
  editingModuleId.value = newModule.id
  expandedModules.value.add(newModule.id)
  moduleTitle.value = ''
  moduleDescription.value = ''
  isAddingModule.value = false
  toast.success('Module added successfully')
}

const updateModule = (moduleId: string, updates: Partial<CourseModule>) => {
  const updatedModules = props.modelValue.map(module => 
    module.id === moduleId 
      ? { ...module, ...updates, updatedAt: new Date() }
      : module
  )
  emit('update:modelValue', updatedModules)
}

const deleteModule = (moduleId: string) => {
  const updatedModules = props.modelValue
    .filter(module => module.id !== moduleId)
  
  emit('update:modelValue', updatedModules)
  toast.success('Module deleted successfully')
}

const handleVideoUpload = async (moduleId: string, video: CourseVideo) => {
  const module = props.modelValue.find(m => m.id === moduleId)
  if (!module) return

  const updatedModule = {
    ...module,
    videos: [...module.videos, video],
    updatedAt: new Date()
  }

  updateModule(moduleId, updatedModule)
  toast.success('Video uploaded successfully')
}

const handleVideoDelete = async (moduleId: string, videoId: string) => {
  const module = props.modelValue.find(m => m.id === moduleId)
  if (!module) return

  const updatedModule = {
    ...module,
    videos: module.videos.filter(v => v.id !== videoId),
    updatedAt: new Date()
  }

  updateModule(moduleId, updatedModule)
  toast.success('Video deleted successfully')
}

const reorderModules = (event: { oldIndex: number; newIndex: number }) => {
  const { oldIndex, newIndex } = event
  const updatedModules = [...props.modelValue]
  const [movedModule] = updatedModules.splice(oldIndex, 1)
  updatedModules.splice(newIndex, 0, movedModule)
  
  emit('update:modelValue', updatedModules)
}

const handleVideoReorder = (moduleId: string, event: { oldIndex: number; newIndex: number }) => {
  const { oldIndex, newIndex } = event
  const module = props.modelValue.find(m => m.id === moduleId)
  if (!module) return

  const updatedVideos = [...module.videos]
  const [movedVideo] = updatedVideos.splice(oldIndex, 1)
  updatedVideos.splice(newIndex, 0, movedVideo)

  updateModule(moduleId, { videos: updatedVideos })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Add Module Button -->
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Course Modules</h2>
      <Button @click="isAddingModule = true" variant="outline" class="gap-2">
        <Icon name="heroicons:plus" class="h-4 w-4" />
        Add Module
      </Button>
    </div>

    <!-- Empty State -->
    <div v-if="!modelValue.length" class="text-center p-8 border-2 border-dashed rounded-lg border-muted-foreground/25">
      <Icon name="heroicons:squares-2x2" class="h-12 w-12 mx-auto text-muted-foreground" />
      <h3 class="mt-4 text-sm font-semibold">No Modules Yet</h3>
      <p class="mt-2 text-sm text-muted-foreground">
        Start by adding your first course module
      </p>
    </div>

    <!-- Modules List -->
    <draggable
      v-else
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      item-key="id"
      handle=".module-drag-handle"
      @end="reorderModules"
      class="space-y-4"
    >
      <template #item="{ element: module }">
        <Card class="relative group">
          <CardHeader class="flex flex-row items-center gap-4">
            <!-- Drag Handle -->
            <button class="module-drag-handle cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name="heroicons:bars-2" class="h-5 w-5 text-muted-foreground" />
            </button>

            <!-- Module Title -->
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold">{{ module.name }}</h3>
                <Badge variant="secondary" class="text-xs">
                  {{ module.videos.length }} {{ module.videos.length === 1 ? 'video' : 'videos' }}
                </Badge>
              </div>
              <p class="text-sm text-muted-foreground mt-1">{{ module.description }}</p>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                @click="toggleModule(module.id)"
              >
                <Icon
                  :name="expandedModules.has(module.id) ? 'heroicons:chevron-up' : 'heroicons:chevron-down'"
                  class="h-4 w-4"
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                class="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                @click="deleteModule(module.id)"
              >
                <Icon name="heroicons:trash" class="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <!-- Module Content -->
          <CardContent v-show="expandedModules.has(module.id)" class="pt-0">
            <!-- Videos List -->
            <draggable
              :model-value="module.videos"
              @update:model-value="(newVideos) => updateModule(module.id, { videos: newVideos })"
              item-key="id"
              handle=".video-drag-handle"
              @end="(event) => handleVideoReorder(module.id, event)"
              class="space-y-2"
            >
              <template #item="{ element: video }">
                <div class="flex items-center gap-4 p-2 rounded-lg hover:bg-muted group/video">
                  <button class="video-drag-handle cursor-move opacity-0 group-hover/video:opacity-100 transition-opacity">
                    <Icon name="heroicons:bars-2" class="h-4 w-4 text-muted-foreground" />
                  </button>
                  <Icon name="heroicons:play-circle" class="h-8 w-8 text-primary" />
                  <div class="flex-1 min-w-0">
                    <h4 class="font-medium truncate">{{ video.name }}</h4>
                    <p class="text-sm text-muted-foreground">
                      {{ video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : 'Processing...' }}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-destructive opacity-0 group-hover/video:opacity-100 transition-opacity"
                    @click="handleVideoDelete(module.id, video.id)"
                  >
                    <Icon name="heroicons:trash" class="h-4 w-4" />
                  </Button>
                </div>
              </template>
            </draggable>

            <!-- Video Upload -->
            <div class="mt-4">
              <VideoUploader
                @upload-complete="(video) => handleVideoUpload(module.id, video)"
                @upload-error="(error) => toast.error(error.message)"
              />
            </div>
          </CardContent>
        </Card>
      </template>
    </draggable>

    <!-- Add Module Dialog -->
    <Dialog v-model:open="isAddingModule">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Module</DialogTitle>
          <DialogDescription>
            Create a new module to organize your course content
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="addNewModule" class="space-y-4">
          <FormField name="name">
            <FormItem>
              <FormLabel>Module Title</FormLabel>
              <FormControl>
                <Input
                  v-model="moduleTitle"
                  placeholder="e.g., Introduction to the Course"
                  :minlength="3"
                  :maxlength="100"
                  required
                />
              </FormControl>
              <FormDescription>
                A clear and concise title for your module
              </FormDescription>
            </FormItem>
          </FormField>

          <FormField name="description">
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  v-model="moduleDescription"
                  placeholder="Describe what students will learn in this module"
                  :minlength="10"
                  :maxlength="500"
                  required
                />
              </FormControl>
              <FormDescription>
                Provide a brief overview of the module's content
              </FormDescription>
            </FormItem>
          </FormField>

          <DialogFooter>
            <Button type="button" variant="ghost" @click="isAddingModule = false">
              Cancel
            </Button>
            <Button type="submit" :disabled="!moduleTitle || !moduleDescription">
              Add Module
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template> 