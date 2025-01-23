<script setup lang="ts">
/**
 * A versatile component for displaying various types of content like events, classes, venues, and social posts.
 * Supports dynamic loading of different post types with loading and error states.
 *
 * @introduction
 * Post component is a versatile building block used to display various types of content like events, classes, venues, and social posts.
 * It supports dynamic loading of different post types with loading and error states.
 *
 * @example Basic Usage ---
 * <Post :post="post" :standalone="false" />
 * --- { "post": { "type": "note", "content": { "text": "Hello World" } } }
 *
 * @feature Dynamic Post Types - Supports different post types with async loading
 * @feature Loading States - Shows skeleton loading state while content is being loaded
 * @feature Error Handling - Gracefully handles and displays errors with ErrorBoundary
 * @feature Modal Support - Opens post details in a modal when clicked (unless standalone)
 *
 * @event update:open - Emitted when the modal is opened or closed
 */

import type { Post } from "~/schemas/post";
import { defineAsyncComponent, type Component } from "vue";
import PostSkeleton from "../common/PostSkeleton.vue";
import ErrorBoundary from "../common/ErrorBoundary.vue";

const NuxtLink = resolveComponent("NuxtLink");

interface Props {
  /** The post data including author, content, and stats */
  post: Post;
  /** Whether the post is displayed standalone or in a list */
  standalone?: boolean;
}

const props = defineProps<Props>();

const { components, getComponentName } = usePostComponent();
const route = useRoute();

const getAsyncComponent = (type: Post["type"]) => {
  const componentName = getComponentName(type);
  const component = components[componentName];

  return defineAsyncComponent({
    loader: async () => {
      const comp = await component();
      return comp as Component;
    },
    loadingComponent: PostSkeleton,
    errorComponent: ErrorBoundary,
  });
};

const isModalOpen = ref(false);

function openModal(event: MouseEvent) {
  if (event.metaKey || event.ctrlKey) {
    return;
  }

  event.preventDefault();
  isModalOpen.value = true;
  history.pushState({}, "", `/post/${props.post.id}`);
}

function closeModal() {
  isModalOpen.value = false;
  history.back();
}
</script>

<template>
  <div class="bg-background rounded-lg shadow-sm border border-border">
    <ErrorBoundary>
      <PostHeader
        :author="post.author"
        :timestamp="post.timestamp"
        :type="post.type"
      />

      <Suspense>
        <template #default>
          <a
            v-if="!standalone"
            :href="`/post/${post.id}`"
            @click="openModal"
            class="block"
          >
            <component
              :is="getAsyncComponent(post.type)"
              :content="post.content as any"
            />
          </a>
          <div v-else class="block">
            <component
              :is="getAsyncComponent(post.type)"
              :content="post.content as any"
            />
          </div>
        </template>
        <template #fallback>
          <PostSkeleton />
        </template>
      </Suspense>

      <PostTags v-if="post.content.tags" :tags="post.content.tags" />
      <PostActions :stats="post.stats" :type="post.type" />
    </ErrorBoundary>
  </div>

  <Dialog :open="isModalOpen" @update:open="closeModal">
    <DialogContent
      class="container max-w-xl grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>Post</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4 overflow-y-auto px-6">
        <div class="flex flex-col justify-between">
          <PostView :post="post" />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
