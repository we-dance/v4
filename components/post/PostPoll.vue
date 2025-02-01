<script setup lang="ts">
import type { Poll } from '~/schemas/post'

defineProps<{
  poll: Poll
}>()
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="option in poll.options"
      :key="option.id"
      class="relative bg-accent/10 rounded-lg p-3 cursor-pointer hover:bg-accent/20"
    >
      <div class="flex justify-between items-center relative z-10">
        <span>{{ option.text }}</span>
        <span class="text-sm text-muted-foreground">
          {{ Math.round((option.votes / poll.totalVotes) * 100) }}%
        </span>
      </div>
      <div
        class="absolute left-0 top-0 h-full bg-primary/20 rounded-lg opacity-50"
        :style="{
          width: `${(option.votes / poll.totalVotes) * 100}%`,
        }"
      />
    </div>
    <div class="text-sm text-muted-foreground">{{ poll.totalVotes }} votes</div>
  </div>
</template>
