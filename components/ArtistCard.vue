<script setup>
defineProps({
  artist: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div
    class="relative rounded-lg border border-border bg-card shadow-sm hover:border-border/80 transition-all duration-200 flex flex-col h-full"
  >
    <!-- Card Content Wrapper -->
    <div class="flex-1 flex flex-col">
      <!-- Card Header with Image and Basic Info -->
      <div class="p-4 flex gap-4">
        <div class="flex-shrink-0">
          <img
            class="h-16 w-16 rounded-full object-cover"
            :src="artist.image"
            :alt="artist.name"
            loading="lazy"
          />
        </div>

        <div class="min-w-0 flex-1">
          <NuxtLink :to="`/artists/${artist.id}`" class="focus:outline-none">
            <span class="absolute inset-0" aria-hidden="true" />

            <!-- Name and Master Badge -->
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-medium text-foreground truncate">
                {{ artist.name }}
              </h3>
              <Badge
                v-if="artist.level === 'master'"
                variant="secondary"
                class="bg-warning/10 text-warning border-warning/20"
              >
                Master
              </Badge>
            </div>

            <!-- Roles -->
            <div class="flex flex-wrap gap-1.5 mt-2">
              <Badge
                v-for="role in artist.roles"
                :key="role"
                variant="secondary"
                class="capitalize"
              >
                {{ role }}
              </Badge>
            </div>

            <!-- Languages -->
            <div class="flex flex-wrap items-center gap-1.5 mt-2">
              <span
                v-for="lang in artist.languages"
                :key="lang"
                class="text-xs text-muted-foreground"
              >
                {{ lang }}
              </span>
            </div>

            <!-- Specialties -->
            <p
              v-if="artist.specialties?.length"
              class="mt-2 text-sm text-muted-foreground line-clamp-2"
            >
              {{ artist.specialties.join(' • ') }}
            </p>

            <!-- Experience -->
            <div
              v-if="artist.experience"
              class="mt-2 text-sm text-muted-foreground"
            >
              {{ artist.experience.years }}+ years
              <template v-if="artist.experience.teachingLevels">
                • {{ artist.experience.teachingLevels.join(', ') }}
              </template>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Availability -->
      <div v-if="artist.availability" class="px-4 pb-4 mt-auto space-y-3">
        <!-- Services and Pricing -->
        <div class="flex flex-col gap-2">
          <div
            v-if="artist.availability.privateClasses"
            class="flex items-center justify-between text-sm"
          >
            <span class="flex items-center gap-1 text-muted-foreground">
              <Icon name="ph:check-circle" class="h-3.5 w-3.5 text-primary" />
              Private Classes
            </span>
            <span
              v-if="artist.availability.pricing?.privateClass"
              class="text-foreground"
            >
              <span class="font-medium">
                {{ artist.availability.pricing.privateClass.amount }}€
              </span>
              <span class="text-muted-foreground">
                /{{ artist.availability.pricing.privateClass.duration }}min
              </span>
            </span>
          </div>
          <div
            v-if="artist.availability.workshops"
            class="flex items-center justify-between text-sm"
          >
            <span class="flex items-center gap-1 text-muted-foreground">
              <Icon name="ph:check-circle" class="h-3.5 w-3.5 text-primary" />
              Workshops
            </span>
            <span
              v-if="artist.availability.pricing?.workshop"
              class="text-foreground"
            >
              <span class="font-medium">
                {{ artist.availability.pricing.workshop.amount }}€
              </span>
              <span class="text-muted-foreground">
                /{{ artist.availability.pricing.workshop.duration }}min
                <span class="text-xs"
                  >({{ artist.availability.pricing.workshop.note }})</span
                >
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Card Footer -->
    <div
      class="px-4 py-3 bg-muted border-t border-border flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground rounded-b-lg"
    >
      <div class="flex items-center gap-1.5 shrink-0">
        <Icon name="ph:map-pin" class="h-4 w-4" />
        <span>
          {{ artist.availability?.currentLocation || artist.location }}
          <span
            v-if="artist.availability?.currentLocation"
            class="text-xs text-muted-foreground/70"
          >
            (from {{ artist.location }})
          </span>
        </span>
      </div>

      <div class="ml-auto flex items-center gap-4 shrink-0">
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1">
            <Icon name="ph:star-fill" class="h-4 w-4 text-warning" />
            <span class="font-medium text-foreground">{{ artist.rating }}</span>
            <span class="text-muted-foreground"
              >({{ artist.reviewCount }})</span
            >
          </div>
          <div class="flex items-center gap-1 text-muted-foreground">
            <Icon name="ph:users" class="h-4 w-4" />
            <span>{{ artist.followers }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
