<script setup lang="ts">
const { course, isUnlocked } = defineProps<{
  course: any
  isUnlocked: boolean
}>()
</script>

<template>
  <div class="bg-background rounded-xl shadow-sm overflow-hidden">
    <div class="p-4 border-b">
      <h3 class="font-semibold">Course Materials</h3>
    </div>
    <div class="p-4">
      <ul class="space-y-3">
        <li v-for="material in course.resources" :key="material.id">
          <a
            :href="material.url"
            target="_blank"
            class="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer"
          >
            <Icon name="ph:file" class="w-5 h-5 text-muted-foreground" />
            <div class="flex-1">
              <div class="text-sm font-medium">{{ material.name }}</div>
              <div class="text-xs text-muted-foreground">
                {{ material.description }}
              </div>
            </div>
            <Icon
              v-if="material.locked && !isUnlocked"
              name="ph:lock-simple"
              class="w-5 h-5 text-muted-foreground"
            />
            <Icon
              v-else
              name="ph:download-simple"
              class="w-5 h-5 text-muted-foreground"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
