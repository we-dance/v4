<script setup lang="ts">
import type { CommentWithReplies } from "~/schemas/comment";
import { mockComments } from "~/data/mockComments";
import UserPoints from "~/components/common/UserPoints.vue";

const currentUserId = "4"; // Mock current user ID
const isPostAuthor = true; // Mock post author status

// Comments data
const comments = ref<CommentWithReplies[]>(mockComments);

const newComment = ref("");
const replyingTo = ref<CommentWithReplies | null>(null);

const addComment = () => {
  if (!newComment.value.trim()) return;

  const comment: CommentWithReplies = {
    id: Date.now(),
    author: {
      id: currentUserId,
      name: "Current User",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      points: 50,
    },
    text: replyingTo.value
      ? `@${replyingTo.value.author.name} ${newComment.value}`
      : newComment.value,
    timestamp: "Just now",
    stats: {
      likes: 0,
    },
  };

  if (replyingTo.value) {
    comment.replyTo = {
      id: replyingTo.value.id,
      authorName: replyingTo.value.author.name,
    };
    replyingTo.value = null;
  }

  comments.value.push(comment);
  newComment.value = "";
};

const likeComment = (comment: CommentWithReplies) => {
  comment.isLiked = !comment.isLiked;
  comment.stats.likes += comment.isLiked ? 1 : -1;

  // Internal helpful status when post author likes
  if (isPostAuthor && comment.author.id !== currentUserId) {
    comment.stats.isHelpful = comment.isLiked;
  }
};

const startReply = (comment: CommentWithReplies) => {
  replyingTo.value = comment;
  nextTick(() => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.focus();
    }
  });
};

const cancelReply = () => {
  replyingTo.value = null;
  newComment.value = "";
};

const scrollToComment = (commentId: number) => {
  const element = document.getElementById(`comment-${commentId}`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    element.classList.add("bg-blue-50");
    setTimeout(() => element.classList.remove("bg-blue-50"), 2000);
  }
};
</script>

<template>
  <div class="mt-6 space-y-6">
    <div class="bg-background rounded-lg shadow-sm border border-border p-4">
      <form @submit.prevent="addComment" class="flex gap-4">
        <img
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
          alt="Current User"
          class="w-10 h-10 rounded-full object-cover"
        />
        <div class="flex-1">
          <div v-if="replyingTo" class="mb-2 flex items-center justify-between">
            <span class="text-sm text-muted-foreground">
              Replying to
              <span class="font-medium text-foreground">{{
                replyingTo.author.name
              }}</span>
            </span>
            <button
              @click="cancelReply"
              class="text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
          <textarea
            v-model="newComment"
            rows="2"
            :placeholder="
              replyingTo ? 'Write a reply...' : 'Write a comment...'
            "
            class="w-full px-3 py-2 text-foreground border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none bg-background"
          />
          <div class="mt-2 flex justify-end">
            <Button type="submit" :disabled="!newComment.trim()">
              {{ replyingTo ? "Reply" : "Comment" }}
            </Button>
          </div>
        </div>
      </form>
    </div>

    <div class="space-y-4">
      <div
        v-for="comment in comments"
        :key="comment.id"
        :id="'comment-' + comment.id"
        class="bg-background rounded-lg shadow-sm border border-border p-4 transition-colors duration-500"
      >
        <div class="flex gap-4">
          <img
            :src="comment.author.image"
            :alt="comment.author.name"
            class="w-10 h-10 rounded-full object-cover"
          />
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold text-foreground">
                  {{ comment.author.name }}
                </h3>
                <UserPoints :points="comment.author.points" />
              </div>
              <span class="text-sm text-muted-foreground">{{
                comment.timestamp
              }}</span>
            </div>
            <div v-if="comment.replyTo" class="mt-1">
              <button
                @click="scrollToComment(comment.replyTo.id)"
                class="text-sm text-muted-foreground hover:text-foreground"
              >
                Replying to {{ comment.replyTo.authorName }}
              </button>
            </div>
            <p class="mt-1 text-foreground whitespace-pre-wrap">
              {{ comment.text }}
            </p>
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
                    comment.isLiked
                      ? 'heroicons:heart-solid'
                      : 'heroicons:heart'
                  "
                  class="w-5 h-5"
                />
                {{ comment.stats.likes }}
              </button>
              <button
                @click="startReply(comment)"
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
    </div>
  </div>
</template>
