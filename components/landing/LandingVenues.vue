<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Dance Venues',
  },
  description: {
    type: String,
    default: 'Discover the best dance studios, clubs, and event spaces',
  },
})

const venues = [
  {
    id: 1,
    name: 'TanzStudio',
    image:
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&h=400&fit=crop',
    address: 'Hauptstraße 1, Munich',
    rating: 4.8,
    reviewCount: 124,
    description:
      'Premier dance studio with 3 halls and professional sound system',
    features: ['Sprung Floor', 'Mirrors', 'Sound System'],
  },
  {
    id: 2,
    name: 'Dance Factory',
    image:
      'https://images.unsplash.com/photo-1581974944026-5d6ed762f617?w=800&h=400&fit=crop',
    address: 'Karlsplatz 5, Munich',
    rating: 4.6,
    reviewCount: 89,
    description: 'Modern dance space perfect for classes and social events',
    features: ['Air Conditioning', 'Bar', 'Stage'],
  },
  {
    id: 3,
    name: 'Havana Club',
    image:
      'https://images.unsplash.com/photo-1536758305353-e47b72c06853?w=800&h=400&fit=crop',
    address: 'Schwabing West, Munich',
    rating: 4.9,
    reviewCount: 156,
    description: 'Authentic Latin club with live music every weekend',
    features: ['Live Music', 'Dance Floor', 'Bar'],
  },
]
</script>

<template>
  <section class="py-16 bg-muted">
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
              placeholder="Find dance venues..."
              variant="on-muted"
              class="w-full pl-9"
            />
            <Icon
              name="ph:magnifying-glass"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            />
          </div>
          <div class="flex gap-3">
            <Button
              variant="on-muted"
              class="gap-2 flex-1 sm:flex-initial flex items-center justify-center"
            >
              <Icon name="ph:map-pin" class="w-4 h-4" />
              Near me
            </Button>
            <Button variant="on-muted" as-child class="flex-1 sm:flex-initial">
              <NuxtLink
                to="/venues"
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
          v-for="venue in venues"
          :key="venue.id"
          :to="`/venues/${venue.id}`"
          class="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <div class="aspect-video relative overflow-hidden">
            <img
              :src="venue.image"
              :alt="venue.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-bold text-lg text-foreground">
                {{ venue.name }}
              </h3>
              <div class="flex items-center gap-1 text-amber-500">
                <Icon name="ph:star-fill" class="w-4 h-4" />
                <span class="text-sm">{{ venue.rating }}</span>
              </div>
            </div>
            <p class="text-muted-foreground text-sm mb-3">
              {{ venue.address }}
            </p>
            <p class="text-foreground mb-4">{{ venue.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="feature in venue.features"
                :key="feature"
                class="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full"
              >
                {{ feature }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
