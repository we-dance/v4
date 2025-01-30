<script setup lang="ts">
import type { PostAuthor, PostType } from "~/schemas/post";
import { POST_TYPE_ICONS } from "~/constants/post";
import UserPoints from "~/components/common/UserPoints.vue";

defineProps<{
  author: PostAuthor;
  timestamp: string;
  type: PostType;
}>();
</script>

<template>
  <div class="p-4 flex items-center gap-3">
    <NuxtLink :to="`/artists/${author.id}`">
      <img
        :src="author.image"
        :alt="author.name"
        class="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-primary transition-all"
      />
    </NuxtLink>
    <div class="flex-1">
      <div class="flex items-center gap-2">
        <NuxtLink
          :to="`/artists/${author.id}`"
          class="font-medium text-foreground hover:text-primary transition-colors"
        >
          {{ author.name }}
        </NuxtLink>
        <UserPoints :points="author.points" />
      </div>
      <div class="text-sm text-muted-foreground flex items-center gap-1">
        <span>{{ timestamp }}</span>
        <span>·</span>
        <span class="text-primary">{{ author.location }}</span>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
        <Icon
          v-if="POST_TYPE_ICONS[type]"
          :name="POST_TYPE_ICONS[type]"
          class="w-4 h-4 text-primary"
        />
        <span class="text-sm text-primary capitalize">{{
          type.replace("_", " ")
        }}</span>
      </div>
      <Button variant="ghost" size="icon">
        <Icon name="ph:dots-three" class="w-5 h-5" />
      </Button>
    </div>
  </div>
</template>
