<script setup lang="ts">
import { formatDuration, formatDate } from '~/utils/format'
const { course, currentLesson, isUnlocked } = defineProps<{
  course: any
  currentLesson: any
  isUnlocked: boolean
}>()

const emit = defineEmits<{
  (e: 'selectLesson', lesson: any): void
}>()

const selectLesson = (module: any, lesson: any) => {
  emit('selectLesson', {
    module,
    lesson,
    isLessonAvailable: isLessonAvailable(module, lesson),
    isLessonLocked: isLessonLocked(lesson),
  })
}

const isModuleOpen = (module: any) => {
  if (!module.startsAt) {
    return true
  }

  return module.startsAt && new Date(module.startsAt) < new Date()
}

const isLessonLocked = (lesson: any) => {
  return lesson.locked && !isUnlocked
}

const isLessonAvailable = (module: any, lesson: any) => {
  return isModuleOpen(module) && !isLessonLocked(lesson)
}
</script>

<template>
  <div class="bg-background rounded-xl shadow-sm overflow-hidden">
    <div class="p-4 border-b">
      <h3 class="font-semibold">Course Content</h3>
    </div>
    <div class="divide-y">
      <div v-for="module in course.modules" :key="module.id" class="p-4">
        <h4 class="font-medium">{{ module.name }}</h4>
        <div v-if="module.startsAt" class="text-sm text-muted-foreground">
          Opens on {{ formatDate(module.startsAt) }}
        </div>
        <ul class="space-y-2 mt-2">
          <li
            v-for="lesson in module.lessons"
            :key="lesson.id"
            @click="selectLesson(module, lesson)"
            class="flex items-center gap-3 p-2 rounded hover:bg-muted hover:text-foreground cursor-pointer border-2 border-background"
            :class="{
              'border-muted-foreground': currentLesson?.id === lesson.id,
            }"
          >
            <Icon
              :name="
                isLessonAvailable(module, lesson)
                  ? lesson.fileUrl
                    ? 'ph:download-simple'
                    : 'ph:play-circle'
                  : 'ph:lock-simple'
              "
              class="w-5 h-5"
              :class="
                isLessonAvailable(module, lesson)
                  ? 'text-muted-foreground'
                  : 'text-red-500'
              "
            />
            <div class="flex-1">
              <div
                class="text-sm"
                :class="{
                  'font-medium': currentLesson?.id === lesson.id,
                }"
              >
                {{ lesson.name }}
              </div>
              <div v-if="lesson.duration" class="text-xs text-muted-foreground">
                {{ formatDuration(lesson.duration) }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
