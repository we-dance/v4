<script setup lang="ts">
import { POST_ACTIONS } from '~/constants/post'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  breaks: true,
  linkify: true,
})
const html = (content: string) => {
  return md.render(content)
}

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  standalone: {
    type: Boolean,
    default: false,
  },
  showPinned: {
    type: Boolean,
    default: false,
  },
})

const video = computed(() => {
  return props.post.attachments?.find(
    (attachment) => attachment.type === 'video'
  )
})

const links = computed(() => {
  return (
    props.post.attachments?.filter(
      (attachment) => attachment.type === 'link'
    ) || []
  )
})
</script>

<template>
  <div class="bg-background rounded-lg shadow-sm border border-border">
    <PostHeader
      :author="post.author"
      :created-at="post.createdAt"
      :community="post.style"
      :city="post.city"
      :pinned="showPinned && post.pinned"
    />
    <div class="relative">
      <div class="px-4 pb-4 flex-1">
        <h2 v-if="post.title" class="text-xl font-bold">
          {{ post.title }}
        </h2>
        <div v-if="post.content?.rating" class="flex items-center gap-1 my-2">
          <Icon
            v-for="i in 5"
            :key="i"
            :name="i <= post.content.rating ? 'ph:star-fill' : 'ph:star'"
            class="w-5 h-5"
            :class="
              i <= post.content.rating
                ? 'text-warning'
                : 'text-muted-foreground'
            "
          />
        </div>
        <div v-if="post.summary" class="prose prose-neutral max-w-none">
          {{ post.summary }}
        </div>
        <TPreview
          class="max-w-none x-line-clamp-3"
          v-if="post.content?.format === 'markdown'"
          :content="post.content.text"
        />
      </div>
      <div v-if="video" class="relative aspect-video bg-black">
        <img
          :src="video.thumbnail"
          :alt="video.title"
          class="w-full h-full object-cover opacity-50"
        />
        <Icon
          name="heroicons:play-solid"
          size="64"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
        />
      </div>
      <div v-else-if="post.image" class="relative aspect-video">
        <img
          :src="post.image"
          :alt="post.title"
          class="w-full h-full object-cover"
        />
      </div>
      <div v-else-if="links.length > 0" class="px-4 pb-4">
        <PostLink v-for="link in links" :link="link" />
      </div>
      <div v-if="post.profile" class="mx-4 mb-4 border p-2 rounded-lg">
        <ProfileCard :profile="post.profile" />
      </div>
      <div v-if="post.event" class="mx-4 mb-4 border rounded-lg">
        <EventLine :event="post.event" />
      </div>
      <div v-if="post.course" class="mx-4 mb-4 border rounded-lg">
        <CourseLine :course="post.course" />
      </div>
    </div>
    <div class="p-4 border-t border-border">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button
            class="flex items-center gap-1 text-success hover:bg-success/10 rounded p-1"
          >
            <Icon name="ph:arrow-up" class="w-5 h-5" />
            <span class="text-sm">{{ post.upVotes }}</span>
          </button>

          <button
            class="flex items-center gap-1 text-destructive hover:bg-destructive/10 rounded p-1"
          >
            <Icon name="ph:arrow-down" class="w-5 h-5" />
            <span class="text-sm">{{ post.downVotes }}</span>
          </button>

          <button
            class="flex items-center gap-1 text-muted-foreground hover:bg-muted-foreground/10 rounded p-1"
          >
            <Icon name="ph:bookmark-simple" class="w-5 h-5" />
          </button>

          <button
            class="flex items-center gap-1 text-muted-foreground hover:bg-muted-foreground/10 rounded p-1"
          >
            <Icon name="ph:chat-circle" class="w-5 h-5" />
            <span class="text-sm">{{ post.commentsCount }}</span>
          </button>

          <button
            class="flex items-center gap-1 text-muted-foreground hover:bg-muted-foreground/10 rounded p-1"
          >
            <Icon name="ph:repeat" class="w-5 h-5" />
          </button>
        </div>

        <div class="flex items-center gap-2">
          <Button v-if="POST_ACTIONS[post.type]" variant="primary">
            {{ POST_ACTIONS[post.type] }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
