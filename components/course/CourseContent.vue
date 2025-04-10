<script setup lang="ts">
import { formatDuration } from '~/utils/format'
const { course, currentLesson, isUnlocked } = defineProps<{
  course: any
  currentLesson: any
  isUnlocked: boolean
}>()

const emit = defineEmits<{
  (e: 'selectLesson', lesson: any): void
}>()
</script>

<template>
  <div class="bg-background rounded-xl shadow-sm overflow-hidden">
    <div class="p-4 border-b">
      <h3 class="font-semibold">Course Content</h3>
    </div>
    <div class="divide-y">
      <div v-for="module in course.modules" :key="module.id" class="p-4">
        <h4 class="font-medium mb-2">{{ module.name }}</h4>
        <ul class="space-y-2">
          <li
            v-for="lesson in module.lessons"
            :key="lesson.id"
            @click="emit('selectLesson', lesson)"
            class="flex items-center gap-3 p-2 rounded hover:bg-muted hover:text-foreground cursor-pointer border-2 border-background"
            :class="{
              'border-muted-foreground': currentLesson.id === lesson.id,
            }"
          >
            <Icon
              :name="
                lesson.locked && !isUnlocked
                  ? 'ph:lock-simple'
                  : 'ph:play-circle'
              "
              class="w-5 h-5"
              :class="
                lesson.locked && !isUnlocked
                  ? 'text-red-500'
                  : 'text-muted-foreground'
              "
            />
            <div class="flex-1">
              <div
                class="text-sm"
                :class="{
                  'font-medium': currentLesson.id === lesson.id,
                }"
              >
                {{ lesson.name }}
              </div>
              <div class="text-xs text-muted-foreground">
                {{ formatDuration(lesson.duration) }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
