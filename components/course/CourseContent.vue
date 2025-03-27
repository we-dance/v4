<script setup lang="ts">
const { course, currentLesson } = defineProps<{
  course: any
  currentLesson: any
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
      <div
        v-for="module in course.modules"
        :key="module.identifier"
        class="p-4"
      >
        <h4 class="font-medium mb-2">{{ module.name }}</h4>
        <ul class="space-y-2">
          <li
            v-for="lesson in module.hasPart"
            :key="lesson.identifier"
            @click="emit('selectLesson', lesson)"
            class="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer"
            :class="{
              'bg-accent/10': currentLesson.id === lesson.id,
            }"
          >
            <Icon
              :name="
                lesson.completed
                  ? 'ph:check-circle-fill'
                  : lesson.locked
                    ? 'ph:lock-simple'
                    : 'ph:play-circle'
              "
              class="w-5 h-5"
              :class="
                lesson.completed
                  ? 'text-success'
                  : lesson.locked
                    ? 'text-muted-foreground'
                    : 'text-muted-foreground'
              "
            />
            <div class="flex-1">
              <div
                class="text-sm"
                :class="{
                  'font-medium': currentLesson.identifier === lesson.identifier,
                }"
              >
                {{ lesson.name }}
              </div>
              <div class="text-xs text-muted-foreground">
                {{ lesson.timeRequired }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
