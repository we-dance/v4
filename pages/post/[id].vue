<script setup lang="ts">
import type { Post } from "~/schemas/post";
import { mockPosts } from "~/data/mockPosts";

const route = useRoute();
const router = useRouter();
const id = parseInt(route.params.id as string);

const post = computed(() => mockPosts.find((p) => p.id === id) as Post);

const goBack = () => {
  if (window.history.length > 2) {
    router.back();
  } else {
    // If opened directly (e.g. from bookmarks), go to feed
    router.push("/feed");
  }
};
</script>

<template>
  <div class="container max-w-xl mx-auto px-4 py-4">
    <div class="flex items-center gap-2 mb-4">
      <button
        @click="goBack"
        class="flex items-center text-muted-foreground hover:text-foreground"
      >
        <Icon name="heroicons:arrow-left" class="w-6 h-6" />
      </button>
      <h1 class="text-xl font-semibold leading-none">Post</h1>
    </div>
    <PostView v-if="post" :post="post" />
    <div v-else class="text-center py-8">
      <p class="text-muted-foreground">Post not found</p>
    </div>
  </div>
</template>
