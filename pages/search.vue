<script setup lang="ts">
import { mockPosts } from '~/data/mockPosts'
import { mockEvents } from '~/data/mockEvents'
import { mockArtists } from '~/data/mockArtists'
import { mockVenues } from '~/data/mockVenues'
import { mockCourses } from '~/data/mockCourses'

const route = useRoute()
const searchQuery = ref((route.query.q as string) || '')

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Events', value: 'event' },
  { name: 'Artists', value: 'artist' },
  { name: 'Venues', value: 'venue' },
  { name: 'Courses', value: 'course' },
  { name: 'Posts', value: 'post' },
]

const selectedCategory = ref('all')

const searchResults = computed(() => {
  if (!searchQuery.value) return []

  const query = searchQuery.value.toLowerCase()
  let results = []

  // Search in courses
  results.push(
    ...mockCourses
      .filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
      )
      .map((course) => ({
        type: 'course',
        title: course.title,
        description: course.description,
        image: course.instructor.image,
        to: `/courses/${course.id}`,
      }))
  )

  // Search in events
  results.push(
    ...mockEvents
      .filter(
        (event) =>
          event.name.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.tags?.some((tag) => tag.toLowerCase().includes(query))
      )
      .map((event) => ({
        type: 'event',
        title: event.name,
        description: event.description,
        image: event.image,
        to: `/events/${event.id}`,
      }))
  )

  // Search in artists
  results.push(
    ...mockArtists
      .filter(
        (artist) =>
          artist.name.toLowerCase().includes(query) ||
          artist.specialties?.some((specialty) =>
            specialty.toLowerCase().includes(query)
          )
      )
      .map((artist) => ({
        type: 'artist',
        title: artist.name,
        description: artist.specialties?.join(', '),
        image: artist.image,
        to: `/artists/${artist.id}`,
      }))
  )

  // Search in venues
  results.push(
    ...mockVenues
      .filter(
        (venue) =>
          venue.name.toLowerCase().includes(query) ||
          venue.description.toLowerCase().includes(query)
      )
      .map((venue) => ({
        type: 'venue',
        title: venue.name,
        description: venue.description,
        image: venue.image,
        to: `/venues/${venue.id}`,
      }))
  )

  // Search in posts
  results.push(
    ...mockPosts
      .filter((post) => {
        const content = post.content
        return (
          ('text' in content && content.text?.toLowerCase().includes(query)) ||
          ('title' in content &&
            content.title?.toLowerCase().includes(query)) ||
          ('description' in content &&
            content.description?.toLowerCase().includes(query)) ||
          content.tags?.some((tag) => tag.toLowerCase().includes(query))
        )
      })
      .map((post) => {
        const content = post.content
        return {
          type: 'post',
          title:
            'title' in content
              ? content.title
              : 'text' in content
                ? content.text?.slice(0, 50)
                : '',
          description:
            'description' in content
              ? content.description
              : 'text' in content
                ? content.text
                : '',
          image: 'cover' in content ? content.cover : post.author.image,
          to: `/post/${post.id}`,
        }
      })
  )

  // Filter by category if not 'all'
  if (selectedCategory.value !== 'all') {
    results = results.filter((result) => result.type === selectedCategory.value)
  }

  return results
})

const resultsByType = computed(() => {
  const types = {} as Record<string, number>
  searchResults.value.forEach((result) => {
    types[result.type] = (types[result.type] || 0) + 1
  })
  return types
})
</script>

<template>
  <div class="container max-w-3xl py-6">
    <div class="flex flex-col gap-6">
      <!-- Search Header -->
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Search Results</h1>
        <div class="flex gap-4">
          <Input
            v-model="searchQuery"
            placeholder="Search everything..."
            class="w-full"
          >
            <template #prefix>
              <Icon
                name="ph:magnifying-glass"
                class="w-4 h-4 text-muted-foreground"
              />
            </template>
          </Input>
        </div>
      </div>

      <!-- Categories -->
      <div class="flex gap-2 flex-wrap">
        <Button
          v-for="category in categories"
          :key="category.value"
          :variant="selectedCategory === category.value ? 'default' : 'outline'"
          size="sm"
          @click="selectedCategory = category.value"
        >
          {{ category.name }}
          <Badge
            v-if="resultsByType[category.value] || category.value === 'all'"
            variant="secondary"
            class="ml-2"
          >
            {{
              category.value === 'all'
                ? searchResults.length
                : resultsByType[category.value] || 0
            }}
          </Badge>
        </Button>
      </div>

      <!-- Results -->
      <div v-if="searchResults.length" class="grid gap-4">
        <NuxtLink
          v-for="result in searchResults"
          :key="result.to"
          :to="result.to"
          class="flex gap-4 items-start w-full hover:bg-muted p-4 rounded-lg"
        >
          <img
            :src="result.image"
            class="w-16 h-16 object-cover rounded-lg shrink-0"
          />
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <Badge variant="outline" class="capitalize shrink-0">
                {{ result.type }}
              </Badge>
              <p class="font-medium truncate">{{ result.title }}</p>
            </div>
            <p class="text-sm text-muted-foreground line-clamp-2 mt-1">
              {{ result.description }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <EmptyState v-else-if="searchQuery" variant="no-results">
        <template #description>
          We couldn't find anything for "{{ searchQuery }}". Try searching for
          something else.
        </template>
      </EmptyState>

      <!-- Initial State -->
      <EmptyState v-else variant="no-results">
        <template #description>
          Enter a search term to find events, artists, venues, courses, and
          posts.
        </template>
      </EmptyState>
    </div>
  </div>
</template>
