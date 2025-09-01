<script setup lang="ts">
import type { ArtistProfile } from '~/schemas/profile'
import GradientBackground from '~/components/common/GradientBackground.vue'
import { useDialog } from '~/composables/useDialog'
import { useContact } from '~/composables/useContact'

const { pending, startConversation } = useContact()

const route = useRoute()

const props = defineProps<{
  profile: ArtistProfile
}>()

const navigation = [
  {
    label: 'Schedule',
    to: `/@${props.profile.username}#content`,
    icon: 'ph:calendar',
  },
  {
    label: 'Feed',
    to: `/@${props.profile.username}/feed#content`,
    icon: 'ph:newspaper',
  },
  {
    label: 'About',
    to: `/@${props.profile.username}/about#content`,
    icon: 'ph:info',
  },
  {
    label: 'Classes',
    to: `/@${props.profile.username}/classes#content`,
    icon: 'ph:graduation-cap',
  },
  {
    label: 'Reviews',
    to: `/@${props.profile.username}/reviews#content`,
    icon: 'ph:chat-circle',
  },
  {
    label: 'Media',
    to: `/@${props.profile.username}/media#content`,
    icon: 'ph:image',
  },
]

const dialog = useDialog()

// Actions
const handleContact = () => {
  startConversation(props.profile)
}

const handleBook = () => {
  dialog.open({
    component: 'ArtistBookingDialog',
    props: {
      artist: props.profile,
      onSelect: (service: {
        type: string
        amount: number
        currency: string
        duration: number
      }) => {
        // Navigate to checkout with selected service
        navigateTo(
          `/checkout/${props.profile.id}?type=${service.type}&instructor=${props.profile.id}`
        )
        return
      },
    },
  })
}

const handleFollow = () => {
  console.log('Follow artist:', props.profile.name)
}
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
                v-if="profile.location"
                class="flex items-center justify-center md:justify-start gap-2 text-foreground mb-4"
              >
                <Icon name="ph:map-pin" class="w-4 h-4 md:w-5 md:h-5" />
                <span class="text-sm md:text-base">{{ profile.location }}</span>
              </div>
              <h1
                class="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
              >
                {{ profile.name }}
              </h1>
              {{ profile.bio }}
              <div
                class="flex flex-wrap items-center justify-center md:justify-start gap-2 text-muted-foreground mb-6"
              >
                <Badge
                  v-if="profile.level === 'master'"
                  variant="secondary"
                  class="bg-warning/20 text-warning border-warning/30"
                >
                  Master
                </Badge>
                <Badge
                  v-for="role in profile.roles"
                  :key="role"
                  variant="secondary"
                  class="capitalize bg-background/10 text-foreground border-border/20"
                >
                  {{ role }}
                </Badge>
              </div>

              <!-- Stats -->
              <div
                class="flex justify-center md:justify-start gap-8 text-foreground mb-8"
              >
                <div>
                  <div class="text-xl font-bold text-foreground">
                    {{ profile.stats.followers }}
                  </div>
                  <div class="text-sm text-muted-foreground">subscribers</div>
                </div>
                <div>
                  <div class="text-xl font-bold text-foreground">
                    {{ profile.stats.reviews }}
                  </div>
                  <div class="text-sm text-muted-foreground">reviews</div>
                </div>
              </div>

              <div class="flex justify-center md:justify-start gap-4">
                <Button variant="primary" size="lg" @click="handleBook"
                  >Book Now</Button
                >
                <Button variant="secondary" size="lg" @click="handleFollow"
                  >Subscribe</Button
                >
              </div>
            </div>

            <!-- Right: Image -->
            <div
              class="relative aspect-square rounded-xl overflow-hidden shadow-xl max-w-lg mx-auto"
            >
              <Avatar :profile="profile" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation and Content Wrapper -->
  <div class="relative">
    <!-- Navigation -->
    <div class="bg-background z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="border-b border-muted">
          <div class="flex space-x-8 overflow-x-auto">
            <NuxtLink
              v-for="item in navigation"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-2 border-b-[3px] px-1 py-4 text-sm font-medium whitespace-nowrap -mb-[1px]"
              :class="[
                route.path === item.to.split('#')[0]
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
            <!-- Availability -->
            <div
              v-if="profile.availability"
              class="bg-background rounded-lg border p-6"
            >
              <h3 class="text-lg font-bold text-foreground mb-4">
                Availability
              </h3>
              <div class="space-y-4">
                <table class="w-full">
                  <tbody class="divide-y divide-border">
                    <tr
                      v-if="profile.availability.privateClasses"
                      class="group"
                    >
                      <td class="py-3">
                        <div
                          class="flex items-center gap-2 text-muted-foreground"
                        >
                          <Icon name="ph:user" class="w-5 h-5 text-primary" />
                          Private Classes
                        </div>
                      </td>
                    </tr>
                    <tr v-if="profile.availability.workshops" class="group">
                      <td class="py-3">
                        <div
                          class="flex items-center gap-2 text-muted-foreground"
                        >
                          <Icon
                            name="ph:users-three"
                            class="w-5 h-5 text-primary"
                          />
                          Workshops
                        </div>
                      </td>
                    </tr>
                    <tr v-if="profile.availability.touring" class="group">
                      <td class="py-3">
                        <div
                          class="flex items-center gap-2 text-muted-foreground"
                        >
                          <Icon
                            name="ph:airplane"
                            class="w-5 h-5 text-primary"
                          />
                          Available for Tours
                        </div>
                      </td>
                      <td class="py-3 text-right text-muted-foreground">
                        <Icon
                          name="ph:check"
                          class="w-5 h-5 inline-block text-success"
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

            <div class="bg-background rounded-lg border p-6">
              <h3 class="text-lg font-bold text-foreground mb-4">Contact</h3>
              <Button
                v-if="profile.claimed"
                class="w-full"
                variant="secondary"
                :disabled="pending"
                @click="handleContact"
              >
                <Icon name="ph:envelope" class="w-5 h-5 mr-2" />
                Send Message
              </Button>
              <p v-else class="text-xs text-muted-foreground">
                Messaging unavaliable until this profile is claimed.
              </p>
            </div>

            <div
              v-if="profile?.socialLinks?.length > 0"
              class="bg-background rounded-lg border p-6"
            >
              <h3 class="text-lg font-bold text-foreground mb-4">
                Social Media
              </h3>
              <div class="space-y-3">
                <a
                  v-for="link in profile.socialLinks"
                  :key="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon
                    :name="`ph:${link.platform.toLowerCase()}-logo`"
                    class="w-5 h-5"
                  />
                  {{ link.platform }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
