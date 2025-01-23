<script setup lang="ts">
definePageMeta({
  layout: "design",
});

import { mockPosts } from "~/data/mockPosts";
import Post from "~/components/post/Post.vue";
import { defineComponent, h } from "vue";

// Example post
const examplePost = mockPosts[0] as {
  type: "note";
  id: number;
  author: {
    id: string;
    name: string;
    image: string;
    location: string;
    points: number;
  };
  timestamp: string;
  content: { text: string; tags: string[] };
  stats: { likes: number; comments: number; shares: number };
};

// Example component instance
const ExampleInstance = defineComponent({
  setup() {
    return () => h(Post, { post: examplePost });
  },
});
</script>

<template>
  <ComponentDoc :component="Post" :example="ExampleInstance" />
</template>
