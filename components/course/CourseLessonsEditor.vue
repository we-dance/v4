<script setup lang="ts">
import { toast } from 'vue-sonner'
import { formatDuration } from '~/utils/format'

const props = defineProps<{
  moduleId: string
  lessons?: any[]
}>()

const dialog = useDialog()
const emit = defineEmits(['load'])

const { $client } = useNuxtApp()

const updateLesson = async (lessonId: string, values: any) => {
  try {
    await $client.courses.updateLesson.mutate({
      moduleId: props.moduleId,
      lessonId,
      ...values,
    })
    toast.success('Lesson updated successfully')
    emit('load')
  } catch (error) {
    toast.error((error as Error).message)
  }
}

const deleteLesson = async (lessonId: string) => {
  try {
    await $client.courses.deleteLesson.mutate({
      lessonId,
    })
    toast.success('Lesson deleted successfully')
    emit('load')
  } catch (error) {
    toast.error((error as Error).message)
  }
}

function openEditLessonDialog(lesson?: any) {
  dialog.open({
    component: 'CourseLessonDialog',
    props: {
      lesson,
      onSuccess: (lessonId: string, values: any) =>
        updateLesson(lessonId, values),
    },
  })
}
</script>

<template>
  <div class="space-y-2">
    <div v-if="lessons?.length" class="space-y-2">
      <div
        v-for="(lesson, lessonIndex) in lessons"
        :key="lesson.id || lessonIndex"
        class="flex items-center justify-between gap-2 py-1 group"
      >
        <div class="flex items-center gap-1 flex-shrink-0 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            @click="openEditLessonDialog(lesson)"
            class="h-6 w-6"
            aria-label="Edit Lesson"
          >
            <Icon name="lucide:pencil" class="h-3.5 w-3.5" />
            <span class="sr-only">Edit Lesson</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            @click="deleteLesson(lesson.id)"
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
          <Icon v-else name="lucide:unlock" class="h-4 w-4 text-green-500" />
        </div>
        <span class="flex-1 truncate text-sm" :title="lesson.name">{{
          lesson.name || 'Untitled Lesson'
        }}</span>
        <span v-if="lesson.duration" class="text-xs text-muted-foreground">{{
          formatDuration(lesson.duration)
        }}</span>
      </div>
    </div>
    <div v-else class="text-sm text-muted-foreground py-1 italic">
      No lessons in this module yet.
    </div>
    <!-- Add Lesson Button -->
    <Button
      variant="outline"
      size="sm"
      @click="openEditLessonDialog()"
      class="mt-2 h-8"
    >
      <Icon name="lucide:plus" class="h-3.5 w-3.5 mr-1.5" />
      Add Lesson
    </Button>
  </div>
</template>
