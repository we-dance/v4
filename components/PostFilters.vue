<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update:type', value: string): void
  (e: 'update:location', value: string | null): void
  (e: 'update:style', value: string | null): void
}>()

const { session } = useAppAuth()

const props = defineProps({
  type: {
    type: String,
    default: 'all',
  },
  location: {
    type: String as () => string | null,
    default: null,
  },
  style: {
    type: String as () => string | null,
    default: null,
  },
})

const postTypeOptions = [
  { value: 'all', label: 'All Posts', icon: 'ph:list' },
  { value: 'event', label: 'Events', icon: 'ph:calendar' },
  { value: 'meet', label: 'Meet', icon: 'ph:users' },
  { value: 'note', label: 'Threads', icon: 'ph:chat-centered-dots' },
  { value: 'article', label: 'Articles', icon: 'ph:article-medium' },
  { value: 'review', label: 'Reviews', icon: 'ph:star' },
  { value: 'gig', label: 'Gigs', icon: 'ph:music-notes' },
  { value: 'ask_locals', label: 'Ask Locals', icon: 'ph:question' },
  { value: 'video', label: 'Videos', icon: 'ph:video-camera' },
]

const { communities } = useCommunities()

const communitiesLimit = ref(5)

function loadMoreCommunities() {
  communitiesLimit.value += 5
}

const filteredCommunities = computed(() => {
  return communities.value?.slice(0, communitiesLimit.value)
})

const showLocationFilter = ref(false)
const clearLocationFilter = () => {
  emit('update:location', null)
  showLocationFilter.value = false
}

const selectedType = computed({
  get: () => props.type,
  set: (value) => emit('update:type', value),
})

const selectedLocation = computed({
  get: () => props.location,
  set: (value) => {
    emit('update:location', value)
    showLocationFilter.value = false
  },
})

const selectedStyle = computed({
  get: () => props.style,
  set: (value) => emit('update:style', value),
})

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num
}
</script>

<template>
  <!-- Mobile View -->
  <div class="md:hidden flex items-center gap-2">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="secondary" class="flex items-center gap-2">
          <Icon
            :name="
              postTypeOptions.find((t) => t.value === selectedType)?.icon ||
              'ph:list'
            "
            class="w-4 h-4"
          />
          {{ postTypeOptions.find((t) => t.value === selectedType)?.label }}
          <Icon name="ph:caret-down" class="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          v-for="type in postTypeOptions"
          :key="type.value"
          @click="selectedType = type.value"
          :class="{ 'bg-accent': selectedType === type.value }"
        >
          <Icon :name="type.icon" class="w-4 h-4 mr-2" />
          {{ type.label }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Button
      variant="ghost"
      @click="showLocationFilter = true"
      class="flex items-center gap-2"
      :class="{ 'text-primary': selectedLocation }"
    >
      <Icon name="ph:map-pin" class="w-5 h-5" />
      <span>{{ selectedLocation || 'Location' }}</span>
    </Button>
    <Button
      v-if="selectedLocation"
      variant="ghost"
      size="icon"
      @click="clearLocationFilter"
    >
      <Icon name="ph:x" class="w-4 h-4" />
    </Button>
  </div>

  <!-- Desktop View -->
  <div class="hidden md:flex flex-col gap-6 w-60">
    <div class="flex flex-col gap-2">
      <div class="font-bold text-sm text-muted-foreground">My Communities</div>
      <div class="flex flex-col -mx-2">
        <button
          v-for="style in session?.profile?.danceStyles"
          :key="style.id"
          class="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
          :class="{ 'bg-muted': selectedStyle === style.id }"
          @click="selectedStyle = style.id"
        >
          <div
            class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Icon name="ph:music-notes" class="w-3.5 h-3.5 text-primary" />
          </div>
          <div class="flex-1 min-w-0">
            <NuxtLink
              :to="`/dance/${style.hashtag}`"
              class="flex items-center justify-between"
            >
              <span
                class="text-sm font-medium truncate text-muted-foreground"
                >{{ style.name }}</span
              >
              <span class="text-xs text-muted-foreground">{{
                formatNumber(style.membersCount)
              }}</span>
            </NuxtLink>
          </div>
        </button>
      </div>
      <div class="font-bold text-sm text-muted-foreground">
        Join Communities
      </div>
      <div class="flex flex-col -mx-2">
        <button
          v-for="style in filteredCommunities"
          :key="style.id"
          class="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
          :class="{ 'bg-muted': selectedStyle === style.id }"
          @click="selectedStyle = style.id"
        >
          <div
            class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Icon name="ph:music-notes" class="w-3.5 h-3.5 text-primary" />
          </div>
          <div class="flex-1 min-w-0">
            <NuxtLink
              :to="`/dance/${style.hashtag}`"
              class="flex items-center justify-between"
            >
              <span
                class="text-sm font-medium truncate text-muted-foreground"
                >{{ style.name }}</span
              >
              <span class="text-xs text-muted-foreground">{{
                formatNumber(style.membersCount)
              }}</span>
            </NuxtLink>
          </div>
        </button>
      </div>
      <Button variant="secondary" @click="loadMoreCommunities">
        Load More
      </Button>
    </div>
  </div>

  <!-- Location Sheet (shared between mobile and desktop) -->
  <Sheet :open="showLocationFilter" @update:open="showLocationFilter = false">
    <SheetContent side="bottom" class="h-[80vh]">
      <SheetHeader>
        <SheetTitle>Filter by Location</SheetTitle>
      </SheetHeader>
      <div class="mt-4">
        <LocationPanel
          :location="selectedLocation"
          @update:location="selectedLocation = $event"
        />
      </div>
    </SheetContent>
  </Sheet>
</template>
