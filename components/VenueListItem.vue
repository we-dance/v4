<script setup lang="ts">
interface VenueListItemProps {
  name: string
  location: string
  rating?: number
  description?: string
  tags?: string[]
  image?: string
}

defineProps<VenueListItemProps>()
</script>

<template>
  <div class="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
    <!-- Thumbnail -->
    <img
      :src="image"
      :alt="name"
      class="size-24 object-cover rounded-lg"
    />

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="font-semibold">{{ name }}</h3>
          <p class="text-sm text-muted-foreground">{{ location }}</p>
        </div>
        <div
          v-if="rating"
          class="flex items-center gap-1 text-sm"
        >
          <span class="text-yellow-500">⭐</span>
          {{ rating.toFixed(1) }}
        </div>
      </div>

      <p
        v-if="description"
        class="mt-2 text-sm text-muted-foreground line-clamp-2"
      >
        {{ description }}
      </p>

      <div
        v-if="tags?.length"
        class="mt-2 flex flex-wrap gap-2"
      >
        <Badge
          v-for="tag in tags"
          :key="tag"
          variant="secondary"
        >
          {{ tag }}
        </Badge>
      </div>
    </div>
  </div>
</template> 