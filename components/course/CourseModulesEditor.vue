<script setup lang="ts">
import { toast } from 'vue-sonner'
import { formatDuration } from '~/utils/format'

const course = defineModel<any>()
const dialog = useDialog()
const emit = defineEmits(['load'])

const { $client } = useNuxtApp()

const updateModule = async (moduleId: string, values: any) => {
  try {
    console.log('updateModule', moduleId, values)
    await $client.courses.updateModule.mutate({
      courseId: course.value.id,
      moduleId: moduleId,
      ...values,
    })
    toast.success('Module created successfully')
    emit('load')
  } catch (error) {
    toast.error((error as Error).message)
  }
}

const deleteModule = async (moduleId: string) => {
  try {
    await $client.courses.deleteModule.mutate({
      moduleId,
    })
    toast.success('Module deleted successfully')
    emit('load')
  } catch (error) {
    toast.error((error as Error).message)
  }
}

function openEditModuleDialog(module?: any) {
  dialog.open({
    component: 'CourseModuleDialog',
    props: {
      module,
      onSuccess: (moduleId: string, values: any) =>
        updateModule(moduleId, values),
    },
  })
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center justify-between">
        <div>Modules</div>
        <Button variant="outline" @click="openEditModuleDialog()">
          <Icon name="lucide:plus" class="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </CardTitle>
      <CardDescription>Organize your course into modules</CardDescription>
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
                @click="openEditModuleDialog(module)"
                class="h-7 w-7"
                aria-label="Edit Module"
              >
                <Icon name="lucide:pencil" class="h-4 w-4" />
                <span class="sr-only">Edit Module</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                @click="deleteModule(module.id)"
                class="h-7 w-7 text-destructive hover:text-destructive"
                aria-label="Delete Module"
              >
                <Icon name="lucide:trash" class="h-4 w-4" />
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
          <div class="space-y-2">
            <div v-if="module.lessons?.length" class="space-y-2">
              <div
                v-for="(lesson, lessonIndex) in module.lessons"
                :key="lesson.id || lessonIndex"
                class="flex items-center justify-between gap-2 py-1 group"
              >
                <div
                  class="flex items-center gap-1 flex-shrink-0 transition-opacity"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    @click="openEditLessonDialog(module, lesson, lessonIndex)"
                    class="h-6 w-6"
                    aria-label="Edit Lesson"
                  >
                    <Icon name="lucide:pencil" class="h-3.5 w-3.5" />
                    <span class="sr-only">Edit Lesson</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    @click="deleteLesson(module.id, lesson.id)"
                    class="h-6 w-6 text-destructive hover:text-destructive"
                    aria-label="Delete Lesson"
                  >
                    <Icon name="lucide:trash" class="h-3.5 w-3.5" />
                    <span class="sr-only">Delete Lesson</span>
                  </Button>
                  <Icon
                    v-if="lesson.locked"
                    name="lucide:lock"
                    class="h-4 w-4 text-red-500"
                  />
                  <Icon
                    v-else
                    name="lucide:unlock"
                    class="h-4 w-4 text-green-500"
                  />
                </div>
                <span class="flex-1 truncate text-sm" :title="lesson.name">{{
                  lesson.name || 'Untitled Lesson'
                }}</span>
                <span
                  v-if="lesson.duration"
                  class="text-xs text-muted-foreground"
                  >{{ formatDuration(lesson.duration) }}</span
                >
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
              <Icon name="lucide:plus" class="h-3.5 w-3.5 mr-1.5" />
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
    </CardContent>
  </Card>
</template>
