<script setup lang="ts">
const props = defineProps({
  profile: {
    type: Object as PropType<any>,
    required: true,
  },
})
</script>

<template>
  <div
    :class="[
      'bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow',
    ]"
  >
    <NuxtLink :to="`/@${profile.username}`">
      <div class="p-4">
        <div class="flex items-center gap-3 mb-3">
          <Avatar :profile="profile" class="w-12 h-12 rounded-full" />

          <div>
            <h3 class="font-semibold text-lg">{{ profile.name }}</h3>
            <p class="text-sm text-muted-foreground">
              {{ profile.city?.name }}, {{ profile.city?.country?.name }}
            </p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mb-3">
          <Badge
            v-for="style in profile.styles"
            :key="style"
            variant="secondary"
          >
            {{ style }}
          </Badge>
        </div>
        <p class="text-sm text-muted-foreground mb-4">
          {{ profile.bio }}
        </p>
        <div class="flex flex-wrap gap-2">
          <Button
            v-if="profile.whatsapp"
            variant="secondary"
            size="sm"
            class="gap-1"
            as-child
          >
            <a :href="profile.whatsapp" target="_blank" rel="noopener">
              <Icon name="ph:whatsapp-logo" class="w-4 h-4" />
              WhatsApp
            </a>
          </Button>
          <Button
            v-if="profile.telegram"
            variant="secondary"
            size="sm"
            class="gap-1"
            as-child
          >
            <a :href="profile.telegram" target="_blank" rel="noopener">
              <Icon name="ph:telegram-logo" class="w-4 h-4" />
              Telegram
            </a>
          </Button>
          <Button
            v-if="profile.instagram"
            variant="secondary"
            size="sm"
            class="gap-1"
            as-child
          >
            <a :href="profile.instagram" target="_blank" rel="noopener">
              <Icon name="ph:instagram-logo" class="w-4 h-4" />
              Instagram
            </a>
          </Button>
          <Button
            v-if="profile.facebook"
            variant="secondary"
            size="sm"
            class="gap-1"
            as-child
          >
            <a :href="profile.facebook" target="_blank" rel="noopener">
              <Icon name="ph:facebook-logo" class="w-4 h-4" />
              Facebook
            </a>
          </Button>
          <Button
            v-if="profile.website"
            variant="secondary"
            size="sm"
            class="gap-1"
            as-child
          >
            <a :href="profile.website" target="_blank" rel="noopener">
              <Icon name="ph:globe" class="w-4 h-4" />
              Website
            </a>
          </Button>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
