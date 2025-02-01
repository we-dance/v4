<script setup lang="ts">
defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  muted: {
    type: Boolean,
    default: false,
  },
})

const cities = [
  {
    slug: 'munich',
    name: 'Munich',
    image:
      'https://images.unsplash.com/photo-1595867818082-083862f3d630?w=800&h=400&fit=crop',
    events: 120,
    artists: 45,
    description: 'Vibrant dance scene with regular socials and festivals',
  },
  {
    slug: 'berlin',
    name: 'Berlin',
    image:
      'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&h=400&fit=crop',
    events: 200,
    artists: 80,
    description: "Europe's dance capital with events every night",
  },
  {
    slug: 'london',
    name: 'London',
    image:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop',
    events: 180,
    artists: 65,
    description: 'Rich diversity of dance styles and cultures',
  },
]
</script>

<template>
  <section
    class="py-16"
    :class="{ 'bg-background': !muted, 'bg-muted': muted }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="space-y-6 mb-12">
        <div>
          <h2 class="text-3xl font-bold text-foreground">{{ title }}</h2>
          <p class="text-muted-foreground mt-2">{{ description }}</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="relative flex-1">
            <Input
              type="search"
              placeholder="Find your city..."
              class="w-full pl-9"
            />
            <Icon
              name="ph:magnifying-glass"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            />
          </div>
          <div class="flex gap-3">
            <Button
              variant="outline"
              class="gap-2 flex-1 sm:flex-initial"
              @click="() => {}"
            >
              <Icon name="ph:map-pin" class="w-4 h-4" />
              Near Me
            </Button>
            <Button variant="outline" as-child class="flex-1 sm:flex-initial">
              <NuxtLink
                to="/cities"
                class="flex items-center justify-center gap-2"
              >
                Browse All
                <Icon name="ph:arrow-right" class="w-4 h-4" />
              </NuxtLink>
            </Button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="city in cities"
          :key="city.slug"
          :to="`/cities/${city.slug}`"
          class="group relative aspect-video rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <img
            :src="city.image"
            :alt="city.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 p-6 w-full">
            <h3 class="text-2xl font-bold text-white mb-2">
              {{ city.name }}
            </h3>
            <p class="text-white/80 text-sm mb-3">
              {{ city.description }}
            </p>
            <div class="flex gap-4">
              <span class="text-white text-sm">{{ city.events }}+ Events</span>
              <span class="text-white text-sm"
                >{{ city.artists }}+ Artists</span
              >
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
