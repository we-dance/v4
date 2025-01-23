<script setup lang="ts">
import type { ArtistProfile } from "~/schemas/profile";
import GradientBackground from "~/components/common/GradientBackground.vue";
import ArtistCard from "~/components/ArtistCard.vue";
import { useDialog } from "~/composables/useDialog";

const props = defineProps<{
  artist: ArtistProfile;
}>();

const navigation = [
  {
    label: "Feed",
    to: `/artists/${props.artist.id}#content`,
    icon: "ph:newspaper",
  },
  {
    label: "About",
    to: `/artists/${props.artist.id}/about#content`,
    icon: "ph:info",
  },
  {
    label: "Classes",
    to: `/artists/${props.artist.id}/classes#content`,
    icon: "ph:graduation-cap",
  },
  {
    label: "Reviews",
    to: `/artists/${props.artist.id}/reviews#content`,
    icon: "ph:chat-circle",
  },
  {
    label: "Media",
    to: `/artists/${props.artist.id}/media#content`,
    icon: "ph:image",
  },
];

const dialog = useDialog();

// Actions
const handleContact = () => {
  console.log("Contact artist:", props.artist.name);
};

const handleBook = () => {
  dialog.open({
    component: "ArtistBookingDialog",
    props: {
      artist: props.artist,
      onSelect: (service: {
        type: string;
        amount: number;
        currency: string;
        duration: number;
      }) => {
        // Navigate to checkout with selected service
        navigateTo(
          `/checkout/${props.artist.id}?type=${service.type}&instructor=${props.artist.id}`
        );
        return;
      },
    },
  });
};

const handleFollow = () => {
  console.log("Follow artist:", props.artist.name);
};
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
                <span class="text-sm md:text-base">{{ artist.location }}</span>
              </div>
              <h1
                class="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              >
                {{ artist.name }}
              </h1>
              <div
                class="flex flex-wrap items-center justify-center md:justify-start gap-2 text-white/80 mb-6"
              >
                <Badge
                  v-if="artist.level === 'master'"
                  variant="secondary"
                  class="bg-amber-50 text-amber-700 border-amber-200"
                >
                  Master
                </Badge>
                <Badge
                  v-for="role in artist.roles"
                  :key="role"
                  variant="secondary"
                  class="capitalize"
                >
                  {{ role }}
                </Badge>
              </div>

              <!-- Stats -->
              <div
                class="flex justify-center md:justify-start gap-8 text-white/80 mb-8"
              >
                <div>
                  <div class="text-xl font-bold text-white">
                    {{ artist.stats.followers }}
                  </div>
                  <div class="text-sm">followers</div>
                </div>
                <div>
                  <div class="text-xl font-bold text-white">
                    {{ artist.stats.reviews }}
                  </div>
                  <div class="text-sm">reviews</div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex justify-center md:justify-start gap-4">
                <Button variant="primary" size="lg" @click="handleBook"
                  >Book Now</Button
                >
                <Button variant="secondary" size="lg" @click="handleFollow"
                  >Follow</Button
                >
              </div>
            </div>

            <!-- Right: Image -->
            <div
              class="relative aspect-square rounded-xl overflow-hidden shadow-xl max-w-lg mx-auto"
            >
              <img
                :src="
                  artist.portfolio?.[0]?.url ||
                  'https://api.dicebear.com/7.x/avataaars/svg?seed=' + artist.id
                "
                :alt="artist.name"
                class="w-full h-full object-cover"
              />
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
        <nav class="border-b border-gray-200">
          <div class="flex space-x-8 overflow-x-auto">
            <NuxtLink
              v-for="item in navigation"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-2 border-b-[3px] px-1 py-4 text-sm font-medium whitespace-nowrap -mb-[1px]"
              :class="[
                $route.path === item.to.split('#')[0]
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700',
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
            <div>
              <ArtistCard :artist="artist" />
            </div>

            <!-- Availability -->
            <div
              v-if="artist.availability"
              class="bg-white rounded-lg border p-6"
            >
              <h3 class="text-lg font-bold mb-4">Availability</h3>
              <div class="space-y-4">
                <table class="w-full">
                  <tbody class="divide-y">
                    <tr v-if="artist.availability.privateClasses" class="group">
                      <td class="py-3">
                        <div class="flex items-center gap-2 text-gray-600">
                          <Icon
                            name="ph:user"
                            class="w-5 h-5 text-purple-600"
                          />
                          Private Classes
                        </div>
                      </td>
                    </tr>
                    <tr v-if="artist.availability.workshops" class="group">
                      <td class="py-3">
                        <div class="flex items-center gap-2 text-gray-600">
                          <Icon
                            name="ph:users-three"
                            class="w-5 h-5 text-purple-600"
                          />
                          Workshops
                        </div>
                      </td>
                    </tr>
                    <tr v-if="artist.availability.touring" class="group">
                      <td class="py-3">
                        <div class="flex items-center gap-2 text-gray-600">
                          <Icon
                            name="ph:airplane"
                            class="w-5 h-5 text-purple-600"
                          />
                          Available for Tours
                        </div>
                      </td>
                      <td class="py-3 text-right text-gray-600">
                        <Icon
                          name="ph:check"
                          class="w-5 h-5 inline-block text-green-600"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <Button class="w-full" variant="secondary" @click="handleBook"
                  >Book Now</Button
                >
              </div>
            </div>

            <!-- Social Links -->
            <div
              v-if="artist.socialLinks.length > 0"
              class="bg-white rounded-lg border p-6"
            >
              <h3 class="text-lg font-bold mb-4">Social Media</h3>
              <div class="space-y-3">
                <a
                  v-for="link in artist.socialLinks"
                  :key="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <Icon
                    :name="`ph:${link.platform.toLowerCase()}-logo`"
                    class="w-5 h-5"
                  />
                  {{ link.platform }}
                </a>
              </div>
            </div>

            <!-- Contact -->
            <div class="bg-white rounded-lg border p-6">
              <h3 class="text-lg font-bold mb-4">Contact</h3>
              <Button class="w-full" variant="outline" @click="handleContact">
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
