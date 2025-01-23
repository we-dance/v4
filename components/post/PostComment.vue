<script setup lang="ts">
import type { CommentWithReplies } from "~/schemas/comment";

const props = defineProps<{
  comment: CommentWithReplies;
  currentUserId: string;
  isPostAuthor: boolean;
}>();

const emit = defineEmits<{
  (e: "reply", comment: CommentWithReplies): void;
}>();

const likeComment = (comment: CommentWithReplies) => {
  comment.isLiked = !comment.isLiked;
  comment.stats.likes += comment.isLiked ? 1 : -1;

  // Internal helpful status when post author likes
  if (props.isPostAuthor && comment.author.id !== props.currentUserId) {
    comment.stats.isHelpful = comment.isLiked;
  }
};
</script>

<template>
  <div>
    <div class="bg-background rounded-lg shadow-sm border border-muted p-4">
      <div class="flex gap-4">
        <img
          :src="comment.author.image"
          :alt="comment.author.name"
          class="w-10 h-10 rounded-full object-cover"
        />
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold">{{ comment.author.name }}</h3>
              <UserPoints :points="comment.author.points" />
            </div>
            <span class="text-sm text-muted-foreground">{{
              comment.timestamp
            }}</span>
          </div>
          <p class="mt-1 text-foreground">{{ comment.text }}</p>
          <div class="mt-2 flex items-center gap-4">
            <button
              @click="likeComment(comment)"
              class="flex items-center gap-1 text-sm"
              :class="
                comment.isLiked
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              "
            >
              <Icon
                :name="
                  comment.isLiked ? 'heroicons:heart-solid' : 'heroicons:heart'
                "
                class="w-5 h-5"
              />
              {{ comment.stats.likes }}
            </button>
            <button
              @click="emit('reply', comment)"
              class="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <Icon
                name="heroicons:chat-bubble-left-ellipsis"
                class="w-5 h-5"
              />
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Nested Replies -->
    <div v-if="comment.replies?.length" class="ml-8 space-y-4 mt-4">
      <PostComment
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        :current-user-id="currentUserId"
        :is-post-author="isPostAuthor"
        @reply="emit('reply', $event)"
      />
    </div>
  </div>
</template>
