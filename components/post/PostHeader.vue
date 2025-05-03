<script setup lang="ts">
import type { PostAuthor, PostType } from '~/schemas/post'
import { POST_TYPE_ICONS } from '~/constants/post'
import UserPoints from '~/components/common/UserPoints.vue'

defineProps({
  author: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  community: {
    type: Object,
    required: false,
  },
  city: {
    type: Object,
    required: false,
  },
  pinned: {
    type: Boolean,
    required: false,
  },
})
</script>

<template>
  <div class="p-4 flex items-center gap-3">
    <NuxtLink :to="`/@${author.username}`">
      <Avatar
        :profile="author"
        class="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-primary transition-all"
      />
    </NuxtLink>
    <div class="flex-1">
      <div class="flex items-center gap-2">
        <NuxtLink
          :to="`/@${author.username}`"
          class="font-medium text-foreground hover:text-primary transition-colors"
        >
          {{ author.name }}
        </NuxtLink>
        <UserPoints :points="author.points" />
        <span v-if="pinned" class="text-primary">Pinned</span>
      </div>
      <div class="text-sm text-muted-foreground flex items-center gap-1">
        <span v-if="community" class="text-primary">
          {{ community.name }}
        </span>
        <span v-if="community">·</span>
        <span v-if="city" class="text-primary">
          {{ city.name }}
        </span>
        <span v-if="city" class="uppercase">{{ city?.countryCode }}</span>
        <span v-if="city">·</span>
        <TimeAgo :date="createdAt" />
      </div>
    </div>
    <div class="flex items-center gap-2">
      <Button variant="ghost" size="icon">
        <Icon name="ph:dots-three" class="w-5 h-5" />
      </Button>
    </div>
  </div>
</template>
