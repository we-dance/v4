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

const { $client } = useNuxtApp()
const { data: cities, suspense } = useQuery<any>({
  queryKey: ['cities.popular'],
  queryFn: () => $client.cities.popular.query(),
  staleTime: 1000 * 60 * 60 * 24, // 1 day cache
})

onServerPrefetch(async () => {
  await suspense()
})
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
              variant="secondary"
              class="gap-2 flex-1 sm:flex-initial"
              @click="() => {}"
            >
              <Icon name="ph:map-pin" class="w-4 h-4" />
              Near Me
            </Button>
            <Button variant="secondary" as-child class="flex-1 sm:flex-initial">
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
            :src="city.profiles[0]?.photo"
            :alt="city.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black"
          ></div>
          <div class="absolute inset-0 p-6 w-full flex flex-col">
            <h3 class="text-2xl font-bold text-white">
              {{ city.name }}
            </h3>
            <p class="text-white/80 text-sm mb-3 flex-1">
              {{ city.description }}
            </p>
            <div class="flex gap-4">
              <span class="text-white text-sm"
                >{{ city.membersCount }} Members</span
              >
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
