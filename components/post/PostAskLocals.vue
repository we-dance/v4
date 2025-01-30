<script setup lang="ts">
import type { AskLocalsContent } from "~/schemas/post";

defineProps<{
  content: AskLocalsContent;
}>();
</script>

<template>
  <div class="px-4 pb-4 flex-1">
    <div class="space-y-4">
      <PostTitle :title="content.title" />
      <p class="text-muted-foreground whitespace-pre-wrap">
        {{ content.text }}
      </p>
    </div>
  </div>
</template>
