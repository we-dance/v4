<script setup lang="ts">
import type { Post } from "~/schemas/post";

const props = defineProps<{
  post: Post;
}>();

const router = useRouter();
</script>

<template>
  <div class="container max-w-xl mx-auto px-4 py-20">
    <div class="flex items-center gap-2 mb-4">
      <button
        @click="router.back()"
        class="flex items-center text-gray-500 hover:text-gray-700"
      >
        <Icon name="heroicons:arrow-left" class="w-6 h-6" />
      </button>
      <h1 class="text-xl font-semibold leading-none">Post</h1>
    </div>

    <div class="shadow-sm border border-gray-200 rounded-lg">
      <Post :post="post" standalone />
      <PostComments />
    </div>
  </div>
</template>
