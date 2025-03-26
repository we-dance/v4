<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CourseFormData } from '~/schemas/courseForm'
import type { CourseVideo } from '~/schemas/courseVideo'
import type { CourseMaterial } from '~/schemas/courseMaterial'
import type { CourseModule } from '~/schemas/courseModule'
import type { Module } from '~/types/course'
import { toast } from 'vue-sonner'
import MaterialManager from './course/MaterialManager.vue'
import ModuleManager from './course/ModuleManager.vue'
import ModuleEditor from './course/ModuleEditor.vue'
import draggable from 'vuedraggable'

const props = withDefaults(defineProps<{
  mode: 'create' | 'edit'
  initialData?: Partial<CourseFormData>
  initialModules?: CourseModule[]
  initialMaterials?: CourseMaterial[]
}>(), {
  mode: 'create',
  initialModules: () => [],
  initialMaterials: () => []
})

const emit = defineEmits<{
  (e: 'submit', data: CourseFormData): void
  (e: 'cancel'): void
}>()

const activeTab = ref('info')
const videos = ref<CourseVideo[]>(props.initialModules?.flatMap(m => m.videos) || [])
const materials = ref<CourseMaterial[]>(props.initialMaterials || [])
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

const handleSubmit = (data: CourseFormData) => {
  // Mark current step as completed
  markStepCompleted(activeTab.value)
  
  emit('submit', {
    ...data,
    modules: modules.value,
    materials: materials.value
  } as CourseFormData)
}

const handleVideoUpload = (video: CourseVideo) => {
  videos.value.push(video)
  toast.success('Video uploaded successfully')
}

const handleVideosUpdate = (updatedVideos: CourseVideo[]) => {
  videos.value = updatedVideos
}

const handleVideoDelete = async (video: CourseVideo) => {
  videos.value = videos.value.filter(v => v.id !== video.id)
  toast.success('Video deleted successfully')
}

const handleMaterialsUpdate = (updatedMaterials: CourseMaterial[]) => {
  materials.value = updatedMaterials
}

const handleModulesUpdate = (updatedModules: CourseModule[]) => {
  modules.value = updatedModules.map(module => ({
    ...module,
    videos: module.videos || []
  }))
}

const isDragging = ref(false)

const handleModulesReorder = (event: any) => {
  // Handle reordering logic here
}
</script>

<template>
  <div class="flex h-[calc(100vh-4rem)]">
    <!-- Sidebar -->
    <div class="w-80 border-r bg-card flex flex-col">
      <!-- Course Title -->
      <div class="p-6 border-b">
        <h1 class="text-lg font-semibold truncate">
          {{ initialData?.name || (mode === 'create' ? 'New Course' : 'Edit Course') }}
        </h1>
        <p class="text-sm text-muted-foreground mt-1">
          {{ mode === 'create' ? 'Create a new course' : 'Update course details' }}
        </p>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto p-2">
        <div class="space-y-0.5">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'group relative w-full flex items-center gap-x-3 rounded-lg p-3 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'bg-primary/10 text-primary border-l-2 border-primary'
                : 'text-foreground hover:bg-muted',
              isStepCompleted(tab.id) && 'bg-muted/50'
            ]"
          >
            <Icon :name="tab.icon" class="h-5 w-5 shrink-0" :class="{'text-primary': activeTab === tab.id}" />
            <div class="flex flex-col items-start min-w-0 flex-1">
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
                  activeTab === tab.id
                    ? 'text-primary/80'
                    : 'text-muted-foreground',
                  'text-xs font-normal truncate w-full'
                ]"
              >
                {{ tab.description }}
              </span>
            </div>
          </button>
        </div>
      </nav>

      <!-- Action Buttons -->
      <div class="border-t p-4 space-y-2 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <Button 
          variant="primary" 
          class="w-full justify-start gap-2"
          @click="handleSubmit"
        >
          <Icon name="heroicons:check-circle" class="h-5 w-5" />
          {{ activeTab === 'review' ? (mode === 'create' ? 'Publish Course' : 'Update Course') : 'Save Progress' }}
        </Button>
        <Button 
          variant="outline" 
          class="w-full justify-start gap-2"
          @click="$emit('cancel')"
        >
          <Icon name="heroicons:arrow-left" class="h-5 w-5" />
          Back to Courses
        </Button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto">
      <div class="h-full p-8">
        <!-- Course Information Tab -->
        <div v-show="activeTab === 'info'" class="space-y-6">
          <Card>
            <CardContent class="pt-6">
              <CourseForm
                :initial-data="initialData"
                :submit-label="mode === 'create' ? 'Save and Continue' : 'Save Changes'"
                @submit="handleSubmit"
                @cancel="$emit('cancel')"
              />
            </CardContent>
          </Card>
        </div>

        <!-- Course Modules Tab -->
        <div v-show="activeTab === 'modules'" class="space-y-6">
          <Card>
            <CardContent class="pt-6">
              <ModuleEditor
                :initial-modules="modules"
                @update:modules="handleModulesUpdate"
                @save="(data) => {
                  handleModulesUpdate(data.modules.map(module => ({
                    ...module,
                    id: module.id || `module-${Date.now()}`,
                    videos: [],
                    lessons: module.lessons.map(lesson => ({
                      ...lesson,
                      id: lesson.id || `lesson-${Date.now()}`
                    }))
                  })))
                  markStepCompleted('modules')
                  toast.success('Modules saved successfully')
                  activeTab = 'materials'
                }"
              />
            </CardContent>
          </Card>
        </div>

        <!-- Supplementary Materials Tab -->
        <div v-show="activeTab === 'materials'" class="space-y-6">
          <Card>
            <CardContent class="pt-6">
              <MaterialManager
                :model-value="materials"
                @update:model-value="handleMaterialsUpdate"
              />
            </CardContent>
          </Card>
        </div>

        <!-- Review & Publish Tab -->
        <div v-show="activeTab === 'review'" class="space-y-6">
          <Card>
            <CardContent class="pt-6">
              <div class="flex items-center gap-2 mb-6">
                <Icon name="heroicons:check-badge" class="h-5 w-5 text-muted-foreground" />
                <h2 class="text-lg font-semibold">Review & Publish</h2>
              </div>

              <div class="space-y-8">
                <!-- Course Info Review -->
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-semibold flex items-center gap-2">
                      <Icon name="heroicons:document-text" class="h-5 w-5" />
                      Course Information
                    </h3>
                    <Button variant="ghost" size="sm" class="gap-2" @click="activeTab = 'info'">
                      <Icon name="heroicons:pencil-square" class="h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                  <Card class="bg-muted/50">
                    <CardContent class="p-4">
                      <dl class="space-y-2 text-sm">
                        <div>
                          <dt class="text-muted-foreground">Course Title</dt>
                          <dd class="font-medium">{{ initialData?.name || 'Not set' }}</dd>
                        </div>
                        <div>
                          <dt class="text-muted-foreground">Instructor</dt>
                          <dd class="font-medium">{{ initialData?.instructorName || 'Not set' }}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>

                <!-- Modules Review -->
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-semibold flex items-center gap-2">
                      <Icon name="heroicons:squares-2x2" class="h-5 w-5" />
                      Course Modules
                    </h3>
                    <Button variant="ghost" size="sm" class="gap-2" @click="activeTab = 'modules'">
                      <Icon name="heroicons:pencil-square" class="h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                  <Card class="bg-muted/50">
                    <CardContent class="p-4">
                      <div v-if="modules.length === 0" class="text-sm text-muted-foreground">
                        No modules added yet
                      </div>
                      <div v-else class="space-y-4">
                        <div v-for="module in modules" :key="module.id" class="space-y-2">
                          <h4 class="font-medium">{{ module.title }}</h4>
                          <p class="text-sm text-muted-foreground">{{ module.description }}</p>
                          <div class="text-sm text-muted-foreground">
                            {{ module.videos.length }} videos
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <!-- Materials Review -->
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-semibold flex items-center gap-2">
                      <Icon name="heroicons:book-open" class="h-5 w-5" />
                      Course Materials
                    </h3>
                    <Button variant="ghost" size="sm" class="gap-2" @click="activeTab = 'materials'">
                      <Icon name="heroicons:pencil-square" class="h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                  <Card class="bg-muted/50">
                    <CardContent class="p-4">
                      <div v-if="materials.length === 0" class="text-sm text-muted-foreground">
                        No materials added yet
                      </div>
                      <div v-else class="space-y-2">
                        <div v-for="material in materials" :key="material.id" class="flex items-center gap-2">
                          <Icon name="heroicons:document" class="h-4 w-4 text-muted-foreground" />
                          <span>{{ material.name }}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template> 