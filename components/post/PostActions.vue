<script setup lang="ts">
import type { PostStats, PostType } from "~/schemas/post";
import { POST_ACTIONS } from "~/constants/post";

defineProps<{
  stats: PostStats;
  type: PostType;
}>();
</script>

<template>
  <div class="p-4 border-t border-border">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          class="flex items-center gap-1 text-muted-foreground hover:text-primary"
        >
          <Icon name="ph:heart" class="w-5 h-5" />
          <span v-if="stats.likes || stats.interested">{{
            stats.likes || stats.interested
          }}</span>
        </button>

        <button
          class="flex items-center gap-1 text-muted-foreground hover:text-primary"
        >
          <Icon name="ph:bookmark-simple" class="w-5 h-5" />
          <span v-if="stats.bookmarks">{{ stats.bookmarks }}</span>
        </button>

        <button
          v-if="stats.comments !== undefined"
          class="flex items-center gap-1 text-muted-foreground hover:text-primary"
        >
          <Icon name="ph:chat-circle" class="w-5 h-5" />
          <span>{{ stats.comments }}</span>
        </button>

        <button
          class="flex items-center gap-1 text-muted-foreground hover:text-primary"
        >
          <Icon name="ph:share-network" class="w-5 h-5" />
        </button>
      </div>

      <div class="flex items-center gap-2">
        <Button v-if="POST_ACTIONS[type]" variant="primary">
          {{ POST_ACTIONS[type] }}
        </Button>
      </div>
    </div>
  </div>
</template>
