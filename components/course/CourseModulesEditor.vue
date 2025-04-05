<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { PlusCircle, Pencil, Trash2 } from 'lucide-vue-next'
import { useDialog } from '@/composables/useDialog'
import { toast } from 'vue-sonner'

const course = defineModel<any>()
const dialog = useDialog()
const emit = defineEmits(['save'])

const deletedModuleIds = ref<string[]>([])
const deletedLessonIds = ref<string[]>([])

function triggerSave() {
  emit('save', {
    ...course.value,
    deletedModuleIds: deletedModuleIds.value,
    deletedLessonIds: deletedLessonIds.value,
  })
}

function handleAddModule(values: {
  name: string
  description?: string | null
}) {
  const newModule = {
    ...values,
    order: (course.value?.modules?.length || 0) + 1,
    lessons: [],
  }
  if (!course.value) return
  if (!course.value.modules) course.value.modules = []
  course.value.modules.push(newModule)
  triggerSave()
  toast.success('Module added successfully (locally)')
}

function handleEditModule(
  moduleId: string,
  values: { name: string; description?: string | null }
) {
  if (!course.value?.modules) return
  const moduleIndex = course.value.modules.findIndex((m) => m.id === moduleId)
  if (moduleIndex !== -1) {
    course.value.modules[moduleIndex] = {
      ...course.value.modules[moduleIndex],
      ...values,
    }
    triggerSave()
    toast.success('Module updated successfully (locally)')
  }
}

function deleteModule(moduleId: string) {
  if (!course.value?.modules) return

  const moduleToDelete = course.value.modules.find((m) => m.id === moduleId)

  if (moduleId && !moduleId.startsWith('temp_')) {
    deletedModuleIds.value.push(moduleId)
    moduleToDelete?.lessons?.forEach((lesson) => {
      if (lesson.id && !lesson.id.startsWith('temp_')) {
        deletedLessonIds.value.push(lesson.id)
      }
    })
  }

  course.value.modules = course.value.modules.filter((m) => m.id !== moduleId)
  triggerSave()
  toast.warning('Module deleted (locally)')
}

function openAddModuleDialog() {
  dialog.open({
    component: 'CourseModuleDialog',
    props: {
      onSuccess: handleAddModule,
    },
  })
}

function openEditModuleDialog(module: any) {
  dialog.open({
    component: 'CourseModuleDialog',
    props: {
      moduleData: {
        id: module.id,
        name: module.name,
        description: module.description,
      },
      onSuccess: (values) => handleEditModule(module.id, values),
    },
  })
}

function handleAddLesson(
  moduleId: string,
  values: {
    name: string
    duration?: number | null
    videoId?: string | null
    locked?: boolean
  }
) {
  if (!course.value?.modules) return
  const moduleIndex = course.value.modules.findIndex((m) => m.id === moduleId)
  if (moduleIndex !== -1) {
    const newLesson = {
      ...values,
      id: generateTempId(),
    }
    if (!course.value.modules[moduleIndex].lessons)
      course.value.modules[moduleIndex].lessons = []
    course.value.modules[moduleIndex].lessons.push(newLesson)
    triggerSave()
    toast.success('Lesson added successfully (locally)')
  }
}

function handleEditLesson(
  moduleId: string,
  lessonId: string,
  values: {
    name: string
    duration?: number | null
    videoId?: string | null
    locked?: boolean
  }
) {
  if (!course.value?.modules) return
  const moduleIndex = course.value.modules.findIndex((m) => m.id === moduleId)
  if (moduleIndex !== -1) {
    const lessonIndex = course.value.modules[moduleIndex].lessons?.findIndex(
      (l) => l.id === lessonId
    )
    if (lessonIndex !== -1 && course.value.modules[moduleIndex].lessons) {
      course.value.modules[moduleIndex].lessons[lessonIndex] = {
        ...course.value.modules[moduleIndex].lessons[lessonIndex],
        ...values,
      }
      triggerSave()
      toast.success('Lesson updated successfully (locally)')
    }
  }
}

function deleteLesson(moduleId: string, lessonId: string) {
  if (!course.value?.modules) return
  const moduleIndex = course.value.modules.findIndex((m) => m.id === moduleId)
  if (moduleIndex !== -1 && course.value.modules[moduleIndex].lessons) {
    if (lessonId && !lessonId.startsWith('temp_')) {
      deletedLessonIds.value.push(lessonId)
    }
    course.value.modules[moduleIndex].lessons =
      course.value.modules[moduleIndex].lessons?.filter(
        (l) => l.id !== lessonId
      ) || []
    triggerSave()
    toast.warning('Lesson deleted (locally)')
  }
}

function openAddLessonDialog(moduleId: string) {
  dialog.open({
    component: 'CourseLessonDialog',
    props: {
      onSuccess: (values) => handleAddLesson(moduleId, values),
    },
  })
}

function openEditLessonDialog(moduleId: string, lesson: any) {
  dialog.open({
    component: 'CourseLessonDialog',
    props: {
      lessonData: {
        id: lesson.id,
        name: lesson.name,
        duration: lesson.duration,
        videoId: lesson.videoId,
        locked: lesson.locked,
      },
      onSuccess: (values) => handleEditLesson(moduleId, lesson.id, values),
    },
  })
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Course Content</CardTitle>
      <CardDescription>Manage your course modules and lessons.</CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="course?.modules?.length" class="space-y-6">
        <!-- Module List -->
        <div
          v-for="(module, index) in course.modules"
          :key="module.id || index"
          class="border p-4 rounded-md space-y-3 bg-muted/30 shadow-sm"
        >
          <!-- Module Header -->
          <div class="flex items-center justify-between gap-2">
            <h3
              class="text-lg font-semibold flex-1 truncate"
              :title="module.name"
            >
              {{ module.name || 'Untitled Module' }}
            </h3>
            <div class="flex items-center gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                @click="openEditModuleDialog(module, index)"
                class="h-7 w-7"
                aria-label="Edit Module"
              >
                <Pencil class="h-4 w-4" />
                <span class="sr-only">Edit Module</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                @click="deleteModule(module.id)"
                class="h-7 w-7 text-destructive hover:text-destructive"
                aria-label="Delete Module"
              >
                <Trash2 class="h-4 w-4" />
                <span class="sr-only">Delete Module</span>
              </Button>
            </div>
          </div>

          <!-- Optional: Display module description -->
          <p
            v-if="module.description"
            class="text-sm text-muted-foreground mb-3 ml-4"
          >
            {{ module.description }}
          </p>

          <!-- Lesson List -->
          <div class="pl-4 space-y-2 border-l-2 ml-1 border-border/50">
            <div v-if="module.lessons?.length" class="space-y-2">
              <div
                v-for="(lesson, lessonIndex) in module.lessons"
                :key="lesson.id || lessonIndex"
                class="flex items-center justify-between gap-2 py-1 group"
              >
                <span class="flex-1 truncate text-sm" :title="lesson.name">{{
                  lesson.name || 'Untitled Lesson'
                }}</span>
                <span
                  v-if="lesson.duration"
                  class="text-xs text-muted-foreground"
                  >({{ lesson.duration }} min)</span
                >
                <div
                  class="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    @click="openEditLessonDialog(module, lesson, lessonIndex)"
                    class="h-6 w-6"
                    aria-label="Edit Lesson"
                  >
                    <Pencil class="h-3.5 w-3.5" />
                    <span class="sr-only">Edit Lesson</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    @click="deleteLesson(module.id, lesson.id)"
                    class="h-6 w-6 text-destructive hover:text-destructive"
                    aria-label="Delete Lesson"
                  >
                    <Trash2 class="h-3.5 w-3.5" />
                    <span class="sr-only">Delete Lesson</span>
                  </Button>
                  <Icon
                    v-if="lesson.locked"
                    name="lucide:lock"
                    class="h-4 w-4 text-muted-foreground"
                  />
                  <Icon
                    v-else
                    name="lucide:unlock"
                    class="h-4 w-4 text-green-500"
                  />
                </div>
              </div>
            </div>
            <div v-else class="text-sm text-muted-foreground py-1 italic">
              No lessons in this module yet.
            </div>
            <!-- Add Lesson Button -->
            <Button
              variant="outline"
              size="sm"
              @click="openAddLessonDialog(module.id)"
              class="mt-2 h-8"
            >
              <PlusCircle class="h-3.5 w-3.5 mr-1.5" />
              Add Lesson
            </Button>
          </div>
        </div>
      </div>
      <!-- No Modules Message -->
      <div
        v-else
        class="text-center py-6 text-muted-foreground border-2 border-dashed border-border rounded-md"
      >
        <p class="mb-2">No modules added yet.</p>
        <p>Start by adding your first module below.</p>
      </div>
      <!-- Add Module Button -->
      <div class="mt-6 flex justify-center border-t pt-6">
        <Button variant="default" @click="openAddModuleDialog">
          <PlusCircle class="h-4 w-4 mr-2" />
          Add New Module
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
