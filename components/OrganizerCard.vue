<script setup lang="ts">
interface Props {
  organizer: {
    id: string;
    name: string;
    location: string;
    avatar: string;
    coverImage: string;
    styles: string[];
    eventTypes: string[];
    bio: string;
    eventCount: number;
    links: {
      whatsapp?: string;
      telegram?: string;
      instagram?: string;
      facebook?: string;
      discord?: string;
      website?: string;
    };
  };
  view?: "grid" | "list";
}

const props = withDefaults(defineProps<Props>(), {
  view: "grid",
  showImage: false,
});

function getStyleLabel(value: string) {
  const danceStyles = [
    { value: "salsa", label: "Salsa" },
    { value: "bachata", label: "Bachata" },
    { value: "kizomba", label: "Kizomba" },
    { value: "zouk", label: "Zouk" },
    { value: "swing", label: "Swing" },
    { value: "tango", label: "Tango" },
    { value: "ballet", label: "Ballet" },
    { value: "contemporary", label: "Contemporary" },
  ];
  return danceStyles.find((style) => style.value === value)?.label || value;
}
</script>

<template>
  <div
    :class="[
      'bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow',
      view === 'list' ? 'p-4' : '',
    ]"
  >
    <NuxtLink :to="`/groups/${organizer.id}`">
      <!-- Grid View -->
      <template v-if="view === 'grid'">
        <div
          v-if="showImage"
          class="aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden"
        >
          <img
            :src="organizer.coverImage || '/images/default-cover.jpg'"
            :alt="organizer.name"
            class="object-cover"
          />
        </div>
        <div class="p-4">
          <div class="flex items-center gap-3 mb-3">
            <img
              :src="organizer.avatar || '/images/default-avatar.jpg'"
              :alt="organizer.name"
              class="w-12 h-12 rounded-full"
            />
            <div>
              <h3 class="font-semibold text-lg">{{ organizer.name }}</h3>
              <p class="text-sm text-muted-foreground">
                {{ organizer.location }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mb-3">
            <Badge
              v-for="style in organizer.styles"
              :key="style"
              variant="secondary"
            >
              {{ getStyleLabel(style) }}
            </Badge>
          </div>
          <p class="text-sm text-muted-foreground mb-4">
            {{ organizer.bio }}
          </p>
          <div class="flex flex-wrap gap-2">
            <Button
              v-if="organizer.links.whatsapp"
              variant="outline"
              size="sm"
              class="gap-1"
              as-child
            >
              <a
                :href="organizer.links.whatsapp"
                target="_blank"
                rel="noopener"
              >
                <Icon name="ph:whatsapp-logo" class="w-4 h-4" />
                WhatsApp
              </a>
            </Button>
            <Button
              v-if="organizer.links.telegram"
              variant="outline"
              size="sm"
              class="gap-1"
              as-child
            >
              <a
                :href="organizer.links.telegram"
                target="_blank"
                rel="noopener"
              >
                <Icon name="ph:telegram-logo" class="w-4 h-4" />
                Telegram
              </a>
            </Button>
            <Button
              v-if="organizer.links.instagram"
              variant="outline"
              size="sm"
              class="gap-1"
              as-child
            >
              <a
                :href="
                  'https://instagram.com/' + organizer.links.instagram.slice(1)
                "
                target="_blank"
                rel="noopener"
              >
                <Icon name="ph:instagram-logo" class="w-4 h-4" />
                Instagram
              </a>
            </Button>
            <Button
              v-if="organizer.links.facebook"
              variant="outline"
              size="sm"
              class="gap-1"
              as-child
            >
              <a href="#" class="flex items-center">
                <Icon name="ph:facebook-logo" class="w-4 h-4" />
                <span class="truncate max-w-[150px]">{{
                  organizer.links.facebook
                }}</span>
              </a>
            </Button>
            <Button
              v-if="organizer.links.discord"
              variant="outline"
              size="sm"
              class="gap-1"
              as-child
            >
              <a
                :href="'https://' + organizer.links.discord"
                target="_blank"
                rel="noopener"
              >
                <Icon name="ph:discord-logo" class="w-4 h-4" />
                Discord
              </a>
            </Button>
            <Button
              v-if="organizer.links.website"
              variant="outline"
              size="sm"
              class="gap-1"
              as-child
            >
              <a :href="organizer.links.website" target="_blank" rel="noopener">
                <Icon name="ph:globe" class="w-4 h-4" />
                Website
              </a>
            </Button>
          </div>
        </div>
      </template>

      <!-- List View -->
      <template v-else>
        <div class="flex gap-4">
          <img
            :src="organizer.avatar || '/images/default-avatar.jpg'"
            :alt="organizer.name"
            class="w-16 h-16 rounded-full"
          />
          <div class="flex-1">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-semibold text-lg">{{ organizer.name }}</h3>
                <p class="text-sm text-muted-foreground">
                  {{ organizer.location }}
                </p>
              </div>
              <div class="text-sm text-muted-foreground">
                {{ organizer.eventCount }} events
              </div>
            </div>
            <div class="flex flex-wrap gap-2 my-2">
              <Badge
                v-for="style in organizer.styles"
                :key="style"
                variant="secondary"
              >
                {{ getStyleLabel(style) }}
              </Badge>
            </div>
            <p class="text-sm text-muted-foreground mb-3">
              {{ organizer.bio }}
            </p>
            <div class="flex flex-wrap gap-2">
              <Button
                v-if="organizer.links.whatsapp"
                variant="outline"
                size="sm"
                class="gap-1"
                as-child
              >
                <a
                  :href="organizer.links.whatsapp"
                  target="_blank"
                  rel="noopener"
                >
                  <Icon name="ph:whatsapp-logo" class="w-4 h-4" />
                  WhatsApp
                </a>
              </Button>
              <Button
                v-if="organizer.links.telegram"
                variant="outline"
                size="sm"
                class="gap-1"
                as-child
              >
                <a
                  :href="organizer.links.telegram"
                  target="_blank"
                  rel="noopener"
                >
                  <Icon name="ph:telegram-logo" class="w-4 h-4" />
                  Telegram
                </a>
              </Button>
              <Button
                v-if="organizer.links.instagram"
                variant="outline"
                size="sm"
                class="gap-1"
                as-child
              >
                <a
                  :href="
                    'https://instagram.com/' +
                    organizer.links.instagram.slice(1)
                  "
                  target="_blank"
                  rel="noopener"
                >
                  <Icon name="ph:instagram-logo" class="w-4 h-4" />
                  Instagram
                </a>
              </Button>
              <Button
                v-if="organizer.links.facebook"
                variant="outline"
                size="sm"
                class="gap-1"
                as-child
              >
                <a href="#" class="flex items-center">
                  <Icon name="ph:facebook-logo" class="w-4 h-4" />
                  <span class="truncate max-w-[150px]">{{
                    organizer.links.facebook
                  }}</span>
                </a>
              </Button>
              <Button
                v-if="organizer.links.discord"
                variant="outline"
                size="sm"
                class="gap-1"
                as-child
              >
                <a
                  :href="'https://' + organizer.links.discord"
                  target="_blank"
                  rel="noopener"
                >
                  <Icon name="ph:discord-logo" class="w-4 h-4" />
                  Discord
                </a>
              </Button>
              <Button
                v-if="organizer.links.website"
                variant="outline"
                size="sm"
                class="gap-1"
                as-child
              >
                <a
                  :href="organizer.links.website"
                  target="_blank"
                  rel="noopener"
                >
                  <Icon name="ph:globe" class="w-4 h-4" />
                  Website
                </a>
              </Button>
            </div>
          </div>
        </div>
      </template>
    </NuxtLink>
  </div>
</template>
