<script setup lang="ts">
import type { Post } from '~/schemas/post'

defineProps<{
  post: Post
}>()
</script>

<template>
  <div>
    <Post :post="post" standalone />
    <PostComments />
  </div>
</template>
