<script setup lang="ts">
import type { Organizer } from '~/schemas/organizers'

interface Props {
  organizer: Organizer
  view?: 'grid' | 'list'
  showImage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  view: 'grid',
  showImage: false,
})

function getStyleLabel(value: string) {
  const danceStyles = [
    { value: 'salsa', label: 'Salsa' },
    { value: 'bachata', label: 'Bachata' },
    { value: 'kizomba', label: 'Kizomba' },
    { value: 'zouk', label: 'Zouk' },
    { value: 'swing', label: 'Swing' },
    { value: 'tango', label: 'Tango' },
    { value: 'ballet', label: 'Ballet' },
    { value: 'contemporary', label: 'Contemporary' },
  ]
  return danceStyles.find((style) => style.value === value)?.label || value
}

// handle social link

function getValidUrl(url: string): string {
  if (
    url.includes('wa.me') ||
    url.includes('api.whatsapp.com') ||
    url.includes('chat.whatsapp')
  ) {
    return url
  } else if (url.includes('discord.gg')) {
    return `https://${url}`
  } else if (url.startsWith('@')) {
    return `https://www.instagram.com/${url.slice(1)}`
  } else if (url.includes('instagram.com')) {
    return url
  } else if (url.includes('facebook.com')) {
    return url
  } else if (url.includes(' ') && !url.startsWith("https://")) {
    return '#'
  } else if (url.startsWith('t.me')) {
    return `https://${url}`
  }

  return url
}
const getIcon = (url: string): string => {
  if (url.includes('facebook')) {
    return 'ph:facebook-logo'
  } else if (url.includes('discord')) {
    return 'ph:discord-logo'
  } else if (url.includes('wa.me') || url.includes('chat.whatsapp')) {
    return 'ph:whatsapp-logo'
  } else if (url.includes('t.me')) {
    return 'ph:telegram-logo'
  } else if (url.includes('instagram.com') || url.startsWith('@')) {
    return 'ph:instagram-logo'
  } else if (url.includes(' ') && !url.startsWith('https')) {
    return 'ph:facebook-logo'
  }
  return 'ph:globe'
}

const getName = (url: string): string => {
  if (url.includes('facebook')) {
    return 'Facebook'
  } else if (url.includes('discord')) {
    return 'Discord'
  } else if (url.includes('wa.me') || url.includes('chat.whatsapp')) {
    return 'WhatsApp'
  } else if (url.includes('t.me')) {
    return 'Telegram'
  } else if (url.includes('instagram.com') || url.startsWith('@')) {
    return 'Instagram'
  } else if (url.startsWith('https://')) {
    return 'Website'
  }
  return url
}
</script>

<template>
  <div
    :class="[
      'bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow',
      view === 'list' ? 'p-4' : '',
    ]"
  >
    <!-- Move NuxtLink here (around the title/image) -->
    <NuxtLink :to="`/groups/${organizer.id}`" class="block">
      <div
        v-if="showImage"
        class="aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden"
      >
        <img
          :src="organizer.image || '/images/default-cover.jpg'"
          :alt="organizer.name"
          class="object-cover"
        />
      </div>
    </NuxtLink>

    <div class="p-4">
      <NuxtLink :to="`/groups/${organizer.id}`">
        <div class="flex items-center gap-3 mb-3">
          <img
            :src="organizer.image || '/images/default-avatar.jpg'"
            :alt="organizer.name"
            class="w-12 h-12 rounded-full"
          />
          <div>
            <!-- Apply NuxtLink only to the title -->
            <h3 class="font-semibold text-lg">{{ organizer.name }}</h3>

            <p class="text-sm text-muted-foreground">
              {{ organizer.location }}
            </p>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-2 mb-3">
          <Badge
          v-for="style in organizer.keywords"
          :key="style"
          variant="secondary"
          >
          {{ getStyleLabel(style) }}
        </Badge>
      </div>
      
      <p class="text-sm text-muted-foreground mb-4">
        {{ organizer.description }}
      </p>
    </NuxtLink>

      <div class="flex flex-wrap gap-2">
        <Button
          v-for="(url, index) in organizer.sameAs"
          :key="index"
          variant="outline"
          size="sm"
          class="gap-1"
          as-child
        >
          <a v-if="getValidUrl(url) !== '#'" :href="getValidUrl(url)" target="_blank" rel="noopener">
            <Icon :name="getIcon(url)" class="w-4 h-4" />
            {{ getName(url) }}
          </a>
          <span v-else>
            <Icon :name="getIcon(url)" class="w-4 h-4" />
            {{getName(url)}}
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>
