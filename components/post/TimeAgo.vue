<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'

const props = defineProps<{
  date: string
}>()
</script>

<template>
  <time :datetime="date" :title="date">
    {{
      formatDistanceToNow(new Date(date), {
        addSuffix: true,
        short: true,
      })
    }}
  </time>
</template>
