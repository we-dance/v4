<script setup lang="ts">
import { POST_ACTIONS } from '~/constants/post'
import MarkdownIt from 'markdown-it'
const { $client } = useNuxtApp()
import { toast } from 'vue-sonner'

const emit = defineEmits(['load'])

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

const link = computed(() => {
  return props.post.attachments?.find(
    (attachment) => attachment.type === 'link'
  )
})

const image = computed(() => {
  return props.post.attachments?.find(
    (attachment) => attachment.type === 'image'
  )
})

const editing = ref(false)

const alertDialog = useAlertDialog()

const askToDelete = () => {
  alertDialog.open({
    title: 'Delete Post',
    description: 'Are you sure you want to delete this post?',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    onConfirm: () => {
      alertDialog.close()
      deletePost()
    },
    onCancel: () => {
      alertDialog.close()
    },
  })
}

const deletePost = async () => {
  const promise = $client.posts.delete.mutate(props.post.id)

  toast.promise(promise, {
    loading: 'Deleting post...',
    success: 'Post deleted successfully',
    error: 'Error deleting post',
  })

  promise.then(() => {
    emit('load')
  })
}

const load = () => {
  emit('load')
  editing.value = false
}
</script>

<template>
  <PostEditor :post="post" v-if="editing" @load="load" />
  <div v-else class="bg-background rounded-lg shadow-sm border border-border">
    <div class="p-4 flex items-center gap-3">
      <NuxtLink :to="`/@${post.author.username}`">
        <Avatar
          :profile="post.author"
          class="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-primary transition-all"
        />
      </NuxtLink>
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <NuxtLink
            :to="`/@${post.author.username}`"
            class="font-medium text-foreground hover:text-primary transition-colors"
          >
            {{ post.author.name }}
          </NuxtLink>
          <UserPoints :points="post.author.points" />
          <span v-if="post.pinned" class="text-primary">Pinned</span>
        </div>
        <div class="text-sm text-muted-foreground flex items-center gap-1">
          <span v-if="post.community" class="text-primary">
            {{ post.community.name }}
          </span>
          <span v-if="post.community">·</span>
          <span v-if="post.city" class="text-primary">
            {{ post.city.name }}
          </span>
          <span v-if="post.city" class="uppercase">{{
            post.city?.countryCode
          }}</span>
          <span v-if="post.city">·</span>
          <TimeAgo :date="post.createdAt" />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon">
              <Icon name="ph:dots-three" class="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem @click="editing = true">Edit</DropdownMenuItem>
            <DropdownMenuItem @click="askToDelete">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <div class="relative">
      <div class="px-4 pb-4 flex-1">
        <h2 v-if="post.title" class="text-xl font-bold">
          {{ post.title }}
        </h2>
        <div v-if="post.replyToPost" class="flex text-sm text-muted-foreground">
          <Icon
            name="ph:arrow-bend-down-right-fill"
            class="w-4 h-4 flex-shrink-0"
          />
          <div>
            Replying to
            <router-link
              :to="`/posts/${post.replyToPost.id}`"
              class="font-bold hover:underline"
            >
              {{ post.replyToPost.summary }}
            </router-link>
          </div>
        </div>
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
          excerpt
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
      <div v-else-if="link" class="px-4 pb-4">
        <PostLink :link="link" />
      </div>
      <div v-else-if="image" class="relative aspect-video">
        <img
          :src="image.url"
          :alt="image.title"
          class="w-full h-full object-cover"
        />
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
