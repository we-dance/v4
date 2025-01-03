<script setup lang="ts">
import type { Post } from "~/schemas/post";
import { mockPosts } from "~/data/mockPosts";

const route = useRoute();
const id = parseInt(route.params.id as string);

const post = computed(() => mockPosts.find((p) => p.id === id) as Post);
</script>

<template>
  <PostView v-if="post" :post="post" />
  <div v-else class="text-center py-8">
    <p class="text-gray-500">Post not found</p>
  </div>
</template>
