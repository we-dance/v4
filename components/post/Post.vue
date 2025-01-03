<script setup lang="ts">
import type { Post } from "~/schemas/post";
import { defineAsyncComponent } from "vue";
import PostSkeleton from "../common/PostSkeleton.vue";
import ErrorBoundary from "../common/ErrorBoundary.vue";

const props = defineProps<{
  post: Post;
  standalone?: boolean;
}>();

const route = useRoute();
const router = useRouter();

const { components, getComponentName } = usePostComponent();

const getAsyncComponent = (type: Post["type"]) => {
  const componentName = getComponentName(type);
  const component = components[componentName];

  return defineAsyncComponent({
    loader: () => component(),
    loadingComponent: PostSkeleton,
    errorComponent: ErrorBoundary,
  });
};

const isModalOpen = computed(() => route.path === `/post/${props.post.id}`);

const openModal = (e: MouseEvent) => {
  if (!props.standalone && !e.metaKey && !e.ctrlKey) {
    e.preventDefault();
    router.push(`/post/${props.post.id}`);
  }
};

const closeModal = () => {
  router.push("/");
};
</script>

<template>
  <div>
    <div
      class="bg-white rounded-lg shadow-sm border border-gray-200"
      :class="{ 'cursor-pointer hover:bg-gray-50': !standalone }"
    >
      <NuxtLink
        v-if="!standalone"
        :to="`/post/${post.id}`"
        @click="openModal"
        class="hidden"
      />
      <ErrorBoundary>
        <PostHeader
          :author="post.author"
          :timestamp="post.timestamp"
          :type="post.type"
        />

        <div>
          <Suspense>
            <template #default>
              <component
                :is="getAsyncComponent(post.type)"
                :content="post.content"
              />
            </template>
            <template #fallback>
              <PostSkeleton />
            </template>
          </Suspense>
        </div>

        <PostTags v-if="post.content.tags" :tags="post.content.tags" />
        <PostActions :stats="post.stats" :type="post.type" />
      </ErrorBoundary>
    </div>

    <Dialog :open="isModalOpen" @close="closeModal" class="relative z-50">
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center">
          <DialogPanel class="w-full">
            <PostView :post="post" />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </div>
</template>
