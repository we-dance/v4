<script setup lang="ts">
const { profile } = defineProps<{
  profile: any
}>()
</script>

<template>
  <div class="bg-background rounded-xl shadow-sm overflow-hidden">
    <div class="p-4 border-b">
      <h3 class="font-semibold">About the Instructor</h3>
    </div>
    <div class="p-4">
      <div class="flex items-start gap-4">
        <NuxtLink
          :to="`/@${profile.username}`"
          class="hover:text-accent flex-shrink-0"
        >
          <Avatar :profile="profile" class="w-24 h-24 rounded-lg" />
        </NuxtLink>
        <div>
          <h4 class="font-semibold text-lg">
            <NuxtLink :to="`/@${profile.username}`" class="hover:text-accent">
              {{ profile.name }}
            </NuxtLink>
          </h4>
          <p class="text-sm text-muted-foreground mb-2">
            {{ profile.bio }}
          </p>
          <div
            v-if="profile.aggregateRating"
            class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
          >
            <Icon name="ph:star-fill" class="w-4 h-4 text-warning" />
            {{ profile.aggregateRating?.ratingValue }} ({{
              profile.aggregateRating?.reviewCount
            }}
            reviews)
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-4 mt-4" v-if="profile.instagram">
              <a
                v-if="profile.instagram"
                :href="profile.instagram"
                target="_blank"
                class="text-muted-foreground hover:text-accent"
              >
                <Icon name="ph:instagram-logo" class="w-6 h-6" />
              </a>
              <a
                v-if="profile.youtube"
                :href="profile.youtube"
                target="_blank"
                class="text-muted-foreground hover:text-destructive"
              >
                <Icon name="ph:youtube-logo" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
