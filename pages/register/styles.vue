<script setup lang="ts">
import { getDanceStyles, type DanceStyle } from '@/data/mockStyles'

const route = useRoute()
const router = useRouter()

const preselectedType = ref((route.query.type as string) || '')
const selectedCommunities = ref<string[]>([])
const searchQuery = ref('')
const showAll = ref(false)

interface DanceStyleItem {
  id: string
  label: string
  icon: string
}

interface CategoryGroup {
  category: string
  styles: DanceStyleItem[]
}

const allStyles = getDanceStyles()

// Get popular dance styles based on member count (top 5)
const popularDanceIds = computed(() =>
  allStyles
    .sort((a, b) => b.members - a.members)
    .slice(0, 6)
    .map((style) => style.to.split('/').pop() || '')
)

// Group styles by category
const danceStyles = computed<CategoryGroup[]>(() => {
  const groups: Record<string, DanceStyleItem[]> = {}
  const popularStyles: DanceStyleItem[] = []

  allStyles.forEach((style) => {
    const id = style.to.split('/').pop() || ''
    const styleItem = {
      id,
      label: style.name,
      icon: 'ph:music-notes',
    }

    // Add to popular category if it's a popular dance
    if (popularDanceIds.value.includes(id)) {
      popularStyles.push(styleItem)
    }

    // Add to regular category if showing all or if searching
    if (showAll.value || searchQuery.value) {
      if (!groups[style.category]) {
        groups[style.category] = []
      }
      groups[style.category].push(styleItem)
    }
  })

  const result: CategoryGroup[] = []

  // Add popular category first if there are popular styles
  if (popularStyles.length > 0) {
    result.push({
      category: 'Popular',
      styles: popularStyles.sort((a, b) => {
        const aStyle = allStyles.find((s) => s.to.includes(a.id))
        const bStyle = allStyles.find((s) => s.to.includes(b.id))
        return (bStyle?.members || 0) - (aStyle?.members || 0)
      }),
    })
  }

  // Add other categories
  Object.entries(groups).forEach(([category, styles]) => {
    // Don't show empty categories
    if (styles.length > 0) {
      result.push({
        category,
        // Show all styles in their categories, regardless of popularity
        styles,
      })
    }
  })

  // Filter out categories that became empty after filtering
  return result.filter((group) => group.styles.length > 0)
})

// Remove filteredStyles computed property as we handle search in danceStyles
const filteredStyles = computed<CategoryGroup[]>(() => {
  if (!searchQuery.value) return danceStyles.value

  return danceStyles.value
    .map((category) => ({
      ...category,
      styles: category.styles.filter((style) =>
        style.label.toLowerCase().includes(searchQuery.value.toLowerCase())
      ),
    }))
    .filter((category) => category.styles.length > 0)
})

// Preselect communities based on user type or query
onMounted(() => {
  if (preselectedType.value) {
    selectedCommunities.value = [preselectedType.value]
  }
})

const toggleCommunity = (id: string) => {
  const index = selectedCommunities.value.indexOf(id)
  if (index === -1) {
    selectedCommunities.value.push(id)
  } else {
    selectedCommunities.value.splice(index, 1)
  }
}

const handleSubmit = () => {
  // TODO: Handle community selection submission
  console.log('Selected communities:', selectedCommunities.value)
  router.push('/register/success')
}

const removeStyle = (id: string) => {
  selectedCommunities.value = selectedCommunities.value.filter((s) => s !== id)
}
</script>

<template>
  <div class="bg-background min-h-screen">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4 text-card-foreground">
          Choose Your Dance Styles
        </h1>
        <p class="text-muted-foreground text-lg">
          Select the dance styles you're interested in to personalize your
          experience
        </p>
      </div>

      <div class="bg-card rounded-lg shadow-lg p-8 mb-8">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Search and View Toggle -->
          <div class="flex gap-4">
            <div class="relative flex-1">
              <Input
                v-model="searchQuery"
                variant="on-dark"
                type="search"
                placeholder="Search dance styles..."
                class="pl-10"
              />
              <Icon
                name="ph:magnifying-glass"
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              @click="showAll = !showAll"
            >
              {{ showAll ? 'Show Popular' : 'Show All' }}
            </Button>
          </div>

          <!-- Selected Styles -->
          <div v-if="selectedCommunities.length > 0" class="space-y-3">
            <label class="block text-sm font-medium text-card-foreground">
              Selected Styles
            </label>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="id in selectedCommunities"
                :key="id"
                class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary"
              >
                <span class="text-sm font-medium">
                  {{
                    danceStyles
                      .flatMap((c) => c.styles)
                      .find((s) => s.id === id)?.label
                  }}
                </span>
                <button
                  type="button"
                  @click="removeStyle(id)"
                  class="w-4 h-4 rounded-full hover:bg-primary/20 inline-flex items-center justify-center"
                >
                  <Icon name="ph:x" class="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <!-- Dance Styles by Category -->
          <div v-if="filteredStyles.length > 0" class="space-y-8">
            <div
              v-for="category in filteredStyles"
              :key="category.category"
              class="space-y-4"
            >
              <h3 class="text-lg font-semibold text-card-foreground">
                {{ category.category }}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Button
                  v-for="style in category.styles"
                  :key="style.id"
                  type="button"
                  variant="secondary"
                  @click="toggleCommunity(style.id)"
                  :class="[
                    selectedCommunities.includes(style.id)
                      ? 'bg-primary/10'
                      : '',
                  ]"
                >
                  <Icon :name="style.icon" class="text-primary" />
                  <span class="font-medium truncate">{{ style.label }}</span>
                </Button>
              </div>
            </div>
          </div>

          <!-- No Results -->
          <div
            v-else-if="searchQuery"
            class="text-center py-12 text-muted-foreground"
          >
            No dance styles found for "{{ searchQuery }}"
          </div>

          <div class="flex flex-col items-center gap-4 pt-8">
            <Button
              type="submit"
              size="lg"
              class="w-full max-w-md"
              :variant="
                selectedCommunities.length === 0 ? 'outline' : 'default'
              "
            >
              {{ selectedCommunities.length === 0 ? 'Skip' : 'Continue' }}
            </Button>
            <p class="text-sm text-muted-foreground">
              You can always update your preferences later in your profile
              settings
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
