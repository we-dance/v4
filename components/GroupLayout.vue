<script setup lang="ts">
import type { Group } from "~/schemas/group";
import { danceStyles, eventTypes } from "~/schemas/group";
import GradientBackground from "~/components/common/GradientBackground.vue";
import { useDialog } from "~/composables/useDialog";

const props = defineProps<{
  group: Group;
}>();

const navigation = [
  {
    label: "Feed",
    to: `/groups/${props.group.id}#content`,
    icon: "ph:newspaper",
  },
  {
    label: "About",
    to: `/groups/${props.group.id}/about#content`,
    icon: "ph:info",
  },
  {
    label: "Events",
    to: `/groups/${props.group.id}/events#content`,
    icon: "ph:calendar",
  },
  {
    label: "Members",
    to: `/groups/${props.group.id}/members#content`,
    icon: "ph:users",
  },
  {
    label: "Media",
    to: `/groups/${props.group.id}/media#content`,
    icon: "ph:image",
  },
];

const dialog = useDialog();

const handleMessage = () => {
  console.log("Message group:", props.group.name);
};

const handleFollow = () => {
  console.log("Follow group:", props.group.name);
};

const getDanceStyle = (value: string) =>
  danceStyles.find((s) => s.value === value);
const getEventType = (value: string) =>
  eventTypes.find((t) => t.value === value);
</script>

<template>
  <!-- Hero Section -->
  <div class="relative min-h-[50vh]">
    <div class="relative flex items-center overflow-hidden min-h-[50vh] py-12">
      <GradientBackground />

      <!-- Content -->
      <div class="relative w-full">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <!-- Left: Content -->
            <div class="text-center md:text-left">
              <div
                class="flex items-center justify-center md:justify-start gap-2 text-white/80 mb-4"
              >
                <Icon name="ph:map-pin" class="w-4 h-4 md:w-5 md:h-5" />
                <span class="text-sm md:text-base">{{ group.location }}</span>
              </div>
              <h1
                class="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              >
                {{ group.name }}
              </h1>

              <!-- Dance Styles -->
              <div
                class="flex flex-wrap justify-center md:justify-start gap-2 mb-6"
              >
                <Badge
                  v-for="style in group.styles"
                  :key="style"
                  variant="secondary"
                  class="capitalize"
                >
                  {{ getDanceStyle(style)?.label }}
                </Badge>
              </div>

              <!-- Stats -->
              <div
                class="flex justify-center md:justify-start gap-8 text-white/80 mb-8"
              >
                <div>
                  <div class="text-xl font-bold text-white">
                    {{ group.eventCount }}
                  </div>
                  <div class="text-sm">events</div>
                </div>
                <div>
                  <div class="text-xl font-bold text-white">
                    {{ group.memberCount }}
                  </div>
                  <div class="text-sm">members</div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex justify-center md:justify-start gap-4">
                <Button variant="primary" size="lg" @click="handleFollow">
                  <Icon name="ph:user-plus" class="w-5 h-5 mr-2" />
                  Follow
                </Button>
                <Button variant="secondary" size="lg" @click="handleMessage">
                  <Icon name="ph:chat-circle" class="w-5 h-5 mr-2" />
                  Message
                </Button>
              </div>
            </div>

            <!-- Right: Image -->
            <div
              class="relative aspect-square rounded-xl overflow-hidden shadow-xl max-w-lg mx-auto"
            >
              <img
                v-if="group.coverImage"
                :src="group.coverImage"
                :alt="group.name"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full bg-muted flex items-center justify-center"
              >
                <Icon
                  name="ph:users-three"
                  class="w-24 h-24 text-muted-foreground"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation and Content Wrapper -->
  <div class="relative">
    <!-- Navigation -->
    <div class="bg-white z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="border-b border-muted">
          <div class="flex space-x-8 overflow-x-auto">
            <NuxtLink
              v-for="item in navigation"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-2 border-b-[3px] px-1 py-4 text-sm font-medium whitespace-nowrap -mb-[1px]"
              :class="[
                $route.path === item.to.split('#')[0]
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              ]"
            >
              <Icon v-if="item.icon" :name="item.icon" class="w-4 h-4" />
              {{ item.label }}
            </NuxtLink>
          </div>
        </nav>
      </div>
    </div>

    <!-- Content -->
    <div id="content" class="scroll-mt-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col-reverse md:flex-row gap-8 justify-center">
          <!-- Main Content -->
          <div class="flex-1 space-y-8 max-w-3xl">
            <slot />
          </div>

          <!-- Right Column: Sidebar -->
          <div class="flex-shrink-0 space-y-6 md:w-[320px]">
            <!-- Group Info -->
            <div class="bg-white rounded-lg border p-6">
              <h3 class="text-lg font-bold mb-4">About</h3>
              <p class="text-muted-foreground mb-4">{{ group.bio }}</p>

              <!-- Event Types -->
              <div class="mb-4">
                <h4 class="font-medium text-foreground mb-2">Event Types</h4>
                <div class="flex flex-wrap gap-2">
                  <Badge
                    v-for="type in group.eventTypes"
                    :key="type"
                    variant="secondary"
                  >
                    {{ getEventType(type)?.label }}
                  </Badge>
                </div>
              </div>

              <!-- Location -->
              <div class="flex items-start gap-3">
                <Icon
                  name="ph:map-pin"
                  class="w-5 h-5 text-primary flex-shrink-0 mt-1"
                />
                <div>
                  <div class="font-medium">{{ group.name }}</div>
                  <div class="text-muted-foreground">
                    {{ group.location }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div v-if="group.links" class="bg-white rounded-lg border p-6">
              <h3 class="text-lg font-bold mb-4">Connect</h3>
              <div class="grid grid-cols-3 gap-4">
                <a
                  v-if="group.links.website"
                  :href="group.links.website"
                  target="_blank"
                  class="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
                >
                  <Icon name="ph:globe" class="w-6 h-6 text-primary" />
                  <span class="text-sm">Website</span>
                </a>
                <a
                  v-if="group.links.instagram"
                  :href="
                    'https://instagram.com/' + group.links.instagram.slice(1)
                  "
                  target="_blank"
                  class="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
                >
                  <Icon name="ph:instagram-logo" class="w-6 h-6 text-primary" />
                  <span class="text-sm">Instagram</span>
                </a>
                <a
                  v-if="group.links.whatsapp"
                  :href="group.links.whatsapp"
                  target="_blank"
                  class="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
                >
                  <Icon name="ph:whatsapp-logo" class="w-6 h-6 text-primary" />
                  <span class="text-sm">WhatsApp</span>
                </a>
                <a
                  v-if="group.links.telegram"
                  :href="'https://' + group.links.telegram"
                  target="_blank"
                  class="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
                >
                  <Icon name="ph:telegram-logo" class="w-6 h-6 text-primary" />
                  <span class="text-sm">Telegram</span>
                </a>
              </div>
            </div>

            <!-- Contact -->
            <div class="bg-white rounded-lg border p-6">
              <h3 class="text-lg font-bold mb-4">Contact</h3>
              <Button class="w-full" variant="outline" @click="handleMessage">
                <Icon name="ph:envelope" class="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
