<script setup lang="ts">
const { artist } = useArtist()

// Computed properties for UI
const achievements = computed(() => {
  if (!artist.value?.portfolio) return []
  return artist.value.portfolio
    .filter((item) => item.type === 'achievement')
    .map((item) => item.description || '')
})

const certifications = computed(() => {
  if (!artist.value?.experience?.certifications) return []
  return artist.value.experience.certifications
})

const specialties = computed(() => {
  if (!artist.value?.experience?.specialties) return []
  return artist.value.experience.specialties.map(
    (specialty) => specialty.charAt(0).toUpperCase() + specialty.slice(1)
  )
})

const teachingLevels = computed(() => {
  if (!artist.value?.experience?.teachingLevels) return []
  return artist.value.experience.teachingLevels.map(
    (level) => level.charAt(0).toUpperCase() + level.slice(1)
  )
})
</script>

<template>
  <ArtistLayout v-if="artist" :artist="artist">
    <div class="max-w-xl mx-auto">
      <!-- Specialties -->
      <div v-if="specialties.length > 0">
        <h2 class="text-2xl font-bold mb-4">Specialties</h2>
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="specialty in specialties"
            :key="specialty"
            variant="secondary"
            class="capitalize"
          >
            {{ specialty }}
          </Badge>
        </div>
      </div>

      <!-- Achievements -->
      <div v-if="achievements.length > 0">
        <h2 class="text-2xl font-bold mb-4">Achievements</h2>
        <div class="space-y-4">
          <div
            v-for="(achievement, index) in achievements"
            :key="index"
            class="flex items-start gap-4"
          >
            <div
              class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"
            >
              <Icon name="ph:trophy" class="w-4 h-4 text-accent" />
            </div>
            <div class="text-muted-foreground pt-1">{{ achievement }}</div>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div v-if="certifications.length > 0">
        <h2 class="text-2xl font-bold mb-4">Certifications</h2>
        <div class="space-y-4">
          <div
            v-for="(certification, index) in certifications"
            :key="index"
            class="flex items-start gap-4"
          >
            <div
              class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"
            >
              <Icon name="ph:certificate" class="w-4 h-4 text-accent" />
            </div>
            <div class="text-muted-foreground pt-1">{{ certification }}</div>
          </div>
        </div>
      </div>

      <!-- Teaching Levels -->
      <div v-if="teachingLevels.length > 0">
        <h2 class="text-2xl font-bold mb-4">Teaching Levels</h2>
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="level in teachingLevels"
            :key="level"
            variant="secondary"
            class="capitalize"
          >
            {{ level }}
          </Badge>
        </div>
      </div>

      <!-- Languages -->
      <div v-if="artist.languages.length > 0">
        <h2 class="text-2xl font-bold mb-4">Languages</h2>
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="language in artist.languages"
            :key="language"
            variant="secondary"
          >
            {{ language }}
          </Badge>
        </div>
      </div>
    </div>
  </ArtistLayout>

  <!-- Empty State -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <Icon
        name="ph:user-circle-x"
        class="w-16 h-16 text-muted-foreground mx-auto mb-4"
      />
      <h2 class="text-2xl font-bold text-foreground mb-2">Artist Not Found</h2>
      <p class="text-muted-foreground mb-6">
        The artist you're looking for doesn't exist or has been removed.
      </p>
      <Button as-child>
        <NuxtLink to="/artists">Browse Artists</NuxtLink>
      </Button>
    </div>
  </div>
</template>
