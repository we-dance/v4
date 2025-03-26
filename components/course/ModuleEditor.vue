<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ChevronDown, ChevronRight, Plus, Trash2, GripVertical, Clock, Video } from 'lucide-vue-next'
import type { CourseModule } from '~/schemas/courseModule'
import type { Lesson } from '~/types/course'
import LessonBlock from './LessonBlock.vue'
import draggable from 'vuedraggable'

const props = defineProps<{
  initialModules?: CourseModule[]
}>()

const emit = defineEmits<{
  (e: 'update:modules', modules: CourseModule[]): void
  (e: 'save', data: { modules: CourseModule[] }): void
}>()

const modules = ref<CourseModule[]>(props.initialModules || [{
  id: 'module-1',
  title: "Posture and Balance",
  description: "Build a strong and confident base",
  lessons: [
    {
      id: 'lesson-1',
      title: "Standing Posture",
      videoUrl: "https://stream.mux.com/video1.m3u8",
      description: "Learn how to maintain balance while styling.",
      thumbnailUrl: undefined
    }
  ],
  videos: []
}])
const expandedModules = ref<Set<string>>(new Set())
const errors = ref<string[]>([])
const isDraggingModule = ref(false)
const isDraggingLesson = ref(false)
const uploadProgress = ref<Record<string, number>>({})

// Mock durations for demo - replace with actual video durations
const mockDurations: Record<string, number> = {}
const getModuleDuration = (moduleId: string) => {
  const module = modules.value.find(m => m.id === moduleId)
  if (!module) return 0
  return module.lessons.reduce((total, lesson) => {
    return total + (mockDurations[lesson.id] || Math.floor(Math.random() * 30) + 5)
  }, 0)
}

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
}

const validateModules = () => {
  errors.value = []
  
  if (!modules.value.length) {
    errors.value.push('At least one module is required')
    return false
  }

  let isValid = true
  modules.value.forEach((module, index) => {
    if (!module.title.trim()) {
      errors.value.push(`Module ${index + 1} requires a title`)
      isValid = false
    }
    if (!module.lessons.length) {
      errors.value.push(`Module ${index + 1} (${module.title}) must have at least one lesson`)
      isValid = false
    }
    module.lessons.forEach((lesson, lessonIndex) => {
      if (!lesson.title.trim()) {
        errors.value.push(`Lesson ${lessonIndex + 1} in Module ${index + 1} requires a title`)
        isValid = false
      }
    })
  })

  return isValid
}

const toggleModule = (moduleId: string) => {
  if (expandedModules.value.has(moduleId)) {
    expandedModules.value.delete(moduleId)
  } else {
    expandedModules.value.add(moduleId)
  }
}

const addModule = () => {
  const newModule: CourseModule = {
    id: `module-${Date.now()}`,
    title: 'New Module',
    description: '',
    lessons: [],
    videos: []
  }
  modules.value.push(newModule)
  expandedModules.value.add(newModule.id)
  emit('update:modules', modules.value)
}

const updateModule = (moduleId: string, updates: Partial<CourseModule>) => {
  const index = modules.value.findIndex((m: CourseModule) => m.id === moduleId)
  if (index !== -1) {
    modules.value[index] = { ...modules.value[index], ...updates }
    emit('update:modules', modules.value)
  }
}

const deleteModule = (moduleId: string) => {
  modules.value = modules.value.filter((m: CourseModule) => m.id !== moduleId)
  expandedModules.value.delete(moduleId)
  emit('update:modules', modules.value)
}

const addLesson = (moduleId: string) => {
  const moduleIndex = modules.value.findIndex((m: CourseModule) => m.id === moduleId)
  if (moduleIndex !== -1) {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: 'New Lesson',
      description: '',
      videoUrl: ''
    }
    modules.value[moduleIndex].lessons.push(newLesson)
    emit('update:modules', modules.value)
  }
}

const simulateVideoUpload = async (lessonId: string) => {
  uploadProgress.value[lessonId] = 0
  const interval = setInterval(() => {
    if (uploadProgress.value[lessonId] < 100) {
      uploadProgress.value[lessonId] += 10
    } else {
      clearInterval(interval)
      setTimeout(() => {
        delete uploadProgress.value[lessonId]
      }, 1000)
    }
  }, 500)
}

const updateLesson = async (moduleId: string, lessonId: string, updates: Partial<Lesson>) => {
  const moduleIndex = modules.value.findIndex((m: CourseModule) => m.id === moduleId)
  if (moduleIndex !== -1) {
    const lessonIndex = modules.value[moduleIndex].lessons.findIndex((l: Lesson) => l.id === lessonId)
    if (lessonIndex !== -1) {
      if (updates.videoUrl && updates.videoUrl !== modules.value[moduleIndex].lessons[lessonIndex].videoUrl) {
        await simulateVideoUpload(lessonId)
      }
      modules.value[moduleIndex].lessons[lessonIndex] = {
        ...modules.value[moduleIndex].lessons[lessonIndex],
        ...updates
      }
      emit('update:modules', modules.value)
    }
  }
}

const deleteLesson = (moduleId: string, lessonId: string) => {
  const moduleIndex = modules.value.findIndex((m: CourseModule) => m.id === moduleId)
  if (moduleIndex !== -1) {
    modules.value[moduleIndex].lessons = modules.value[moduleIndex].lessons.filter((l: Lesson) => l.id !== lessonId)
    emit('update:modules', modules.value)
  }
}

const handleModulesReorder = (event: any) => {
  emit('update:modules', modules.value)
}

const saveModules = () => {
  if (validateModules()) {
    // Emit the update event for v-model binding
    emit('update:modules', modules.value)
    
    // Emit the save event with the simplified structure
    emit('save', {
      modules: modules.value.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson => ({
          ...lesson,
          videos: []
        }))
      }))
    })
  }
}

// Expand the first module by default
onMounted(() => {
  if (modules.value.length > 0) {
    expandedModules.value.add(modules.value[0].id)
  }
})

// Mock a duration for the sample lesson
mockDurations['lesson-1'] = 25 // 25 minutes for the standing posture lesson
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Course Modules</h2>
      <Button variant="outline" size="sm" @click="addModule">
        <Plus class="h-4 w-4 mr-2" />
        Add Module
      </Button>
    </div>

    <div v-if="errors.length" class="space-y-2">
      <Alert variant="destructive">
        <AlertTitle>Validation Errors</AlertTitle>
        <AlertDescription>
          <ul class="list-disc list-inside">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>

    <draggable
      v-model="modules"
      item-key="id"
      handle=".module-handle"
      :animation="200"
      ghost-class="opacity-50"
      chosen-class="bg-accent"
      @start="isDraggingModule = true"
      @end="isDraggingModule = false"
      @change="handleModulesReorder"
      class="space-y-3"
    >
      <template #item="{ element: module }">
        <Accordion type="single" collapsible>
          <AccordionItem :value="module.id" class="border rounded-lg bg-card">
            <div class="flex items-start gap-2 p-4">
              <Button
                variant="ghost"
                size="icon"
                class="module-handle cursor-move mt-1"
                title="Drag to reorder"
              >
                <GripVertical class="h-4 w-4 text-muted-foreground" />
              </Button>

              <div class="flex-1">
                <AccordionTrigger class="hover:no-underline">
                  <div class="flex items-center gap-4 flex-1">
                    <Input
                      v-model="module.title"
                      class="max-w-md"
                      placeholder="Module Title"
                      @click.stop
                      @change="updateModule(module.id, { title: module.title })"
                    />
                    <div class="flex items-center gap-3">
                      <Badge variant="secondary" class="gap-1.5">
                        <Video class="h-3.5 w-3.5" />
                        {{ module.lessons.length }} {{ module.lessons.length === 1 ? 'lesson' : 'lessons' }}
                      </Badge>
                      <Badge variant="outline" class="gap-1.5">
                        <Clock class="h-3.5 w-3.5" />
                        {{ formatDuration(getModuleDuration(module.id)) }}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div class="mt-4 space-y-4">
                    <Textarea
                      v-model="module.description"
                      placeholder="Module description"
                      class="min-h-[100px] resize-y"
                      @change="updateModule(module.id, { description: module.description })"
                    />

                    <div class="space-y-3">
                      <draggable
                        v-model="module.lessons"
                        item-key="id"
                        handle=".lesson-handle"
                        :animation="150"
                        ghost-class="opacity-50"
                        chosen-class="bg-accent"
                        @start="isDraggingLesson = true"
                        @end="isDraggingLesson = false"
                        @change="handleModulesReorder"
                        class="space-y-3"
                      >
                        <template #item="{ element: lesson }">
                          <div class="relative">
                            <LessonBlock
                              :model-value="lesson"
                              @update:model-value="(updates) => updateLesson(module.id, lesson.id, updates)"
                              @delete="deleteLesson(module.id, lesson.id)"
                            />
                            <div 
                              v-if="uploadProgress[lesson.id] !== undefined"
                              class="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
                            >
                              <Progress :value="uploadProgress[lesson.id]" class="w-1/2" />
                            </div>
                          </div>
                        </template>
                      </draggable>

                      <Button
                        variant="outline"
                        size="sm"
                        @click="addLesson(module.id)"
                      >
                        <Plus class="h-4 w-4 mr-2" />
                        Add Lesson
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </div>

              <Button
                variant="ghost"
                size="icon"
                class="text-destructive hover:text-destructive hover:bg-destructive/10"
                @click="deleteModule(module.id)"
              >
                <Trash2 class="h-4 w-4" />
              </Button>
            </div>
          </AccordionItem>
        </Accordion>
      </template>
    </draggable>

    <div class="flex justify-end mt-6">
      <Button 
        @click="saveModules" 
        :disabled="!modules.length || errors.length > 0"
        variant="primary"
      >
        <span v-if="errors.length">Fix Validation Errors</span>
        <span v-else>Save Modules</span>
      </Button>
    </div>
  </div>
</template> 