<script setup lang="ts">
const { course } = defineProps<{
  course: any
}>()
</script>

<template>
  <div
    v-if="course.community"
    class="bg-background rounded-xl shadow-sm overflow-hidden"
  >
    <div class="p-4 border-b">
      <h3 class="font-semibold">Community</h3>
    </div>
    <div class="p-4">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="text-center p-3 bg-muted rounded-lg">
          <div class="text-2xl font-bold text-accent">
            {{ course.community.discussions }}
          </div>
          <div class="text-sm text-muted-foreground">Discussions</div>
        </div>
        <div class="text-center p-3 bg-muted rounded-lg">
          <div class="text-2xl font-bold text-accent">
            {{ course.community.activeStudents }}
          </div>
          <div class="text-sm text-muted-foreground">Active Students</div>
        </div>
      </div>
      <div class="bg-accent/10 rounded-lg p-4">
        <h4 class="font-medium mb-2">Next Live Q&A Session</h4>
        <p class="text-sm text-muted-foreground">
          {{ new Date(course.community.nextLiveQ_A).toLocaleString() }}
        </p>
        <Button class="w-full mt-3" variant="secondary">Join Community</Button>
      </div>
    </div>
  </div>
</template>
