<script setup lang="ts">
import { mockPosts } from "~/data/mockPosts";
import { mockEvents } from "~/data/mockEvents";
import { mockArtists } from "~/data/mockArtists";
import { mockVenues } from "~/data/mockVenues";
import { mockCourses } from "~/data/mockCourses";

const dialog = useDialog();
const router = useRouter();
const searchQuery = ref("");
const searchInput = ref();

const categories = [
  { name: "Events", icon: "ph:calendar", to: "/events" },
  { name: "Artists", icon: "ph:users", to: "/artists" },
  { name: "Venues", icon: "ph:map-pin", to: "/venues" },
  { name: "Courses", icon: "ph:graduation-cap", to: "/courses" },
  { name: "Posts", icon: "ph:newspaper", to: "/feed" },
];

const popularSearches = [
  { query: "salsa", label: "Salsa" },
  { query: "bachata", label: "Bachata" },
  { query: "kizomba", label: "Kizomba" },
  { query: "workshop", label: "Workshops" },
  { query: "festival", label: "Festivals" },
];

const handlePopularSearch = (query: string) => {
  searchQuery.value = query;
};

const searchResults = computed(() => {
  if (!searchQuery.value) return [];

  const query = searchQuery.value.toLowerCase();
  const results = [];

  // Search in courses
  results.push(
    ...mockCourses
      .filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
      )
      .map((course) => ({
        type: "course",
        title: course.title,
        description: course.description,
        image: course.instructor.image,
        to: `/courses/${course.id}`,
      }))
  );

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
        type: "event",
        title: event.name,
        description: event.description,
        image: event.image,
        to: `/events/${event.id}`,
      }))
  );

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
        type: "artist",
        title: artist.name,
        description: artist.specialties?.join(", "),
        image: artist.image,
        to: `/artists/${artist.id}`,
      }))
  );

  // Search in venues
  results.push(
    ...mockVenues
      .filter(
        (venue) =>
          venue.name.toLowerCase().includes(query) ||
          venue.description.toLowerCase().includes(query)
      )
      .map((venue) => ({
        type: "venue",
        title: venue.name,
        description: venue.description,
        image: venue.image,
        to: `/venues/${venue.id}`,
      }))
  );

  // Search in posts
  results.push(
    ...mockPosts
      .filter((post) => {
        const content = post.content;
        return (
          ("text" in content && content.text?.toLowerCase().includes(query)) ||
          ("title" in content &&
            content.title?.toLowerCase().includes(query)) ||
          ("description" in content &&
            content.description?.toLowerCase().includes(query)) ||
          content.tags?.some((tag) => tag.toLowerCase().includes(query))
        );
      })
      .map((post) => {
        const content = post.content;
        return {
          type: "post",
          title:
            "title" in content
              ? content.title
              : "text" in content
                ? content.text?.slice(0, 50)
                : "",
          description:
            "description" in content
              ? content.description
              : "text" in content
                ? content.text
                : "",
          image: "cover" in content ? content.cover : post.author.image,
          to: `/post/${post.id}`,
        };
      })
  );

  return results;
});

const handleSearch = () => {
  if (!searchQuery.value) return;

  // Close dialog
  dialog.close();

  // Navigate to search results
  router.push({
    path: "/search",
    query: { q: searchQuery.value },
  });
};

// Focus input when dialog opens
onMounted(() => {
  nextTick(() => {
    const input = searchInput.value?.$el?.querySelector("input");
    input?.focus();
  });
});
</script>

<template>
  <div class="w-full max-w-lg flex flex-col min-h-[420px] overflow-hidden">
    <DialogHeader>
      <DialogTitle>Search</DialogTitle>
    </DialogHeader>

    <div class="flex-1 py-4 px-2 flex flex-col min-h-0">
      <div class="flex-none">
        <Input
          ref="searchInput"
          v-model="searchQuery"
          placeholder="Search everything..."
          class="w-full"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <Icon
              name="ph:magnifying-glass"
              class="w-4 h-4 text-muted-foreground"
            />
          </template>
        </Input>
      </div>

      <ScrollArea v-if="searchResults.length" class="mt-4 max-h-[300px]">
        <div class="space-y-2">
          <div
            v-for="result in searchResults"
            :key="result.to"
            class="flex gap-4"
          >
            <NuxtLink
              :to="result.to"
              class="flex gap-4 items-center w-full hover:bg-muted p-3 rounded-lg"
              @click="dialog.close()"
            >
              <img
                :src="result.image"
                class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg shrink-0"
              />
              <div class="flex-1 min-w-0">
                <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                  <Badge
                    variant="outline"
                    class="capitalize w-fit text-xs sm:text-sm"
                  >
                    {{ result.type }}
                  </Badge>
                  <p
                    class="font-medium truncate text-sm sm:text-base text-foreground"
                  >
                    {{ result.title }}
                  </p>
                </div>
                <p
                  class="text-xs sm:text-sm text-muted-foreground truncate mt-1"
                >
                  {{ result.description }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </ScrollArea>

      <div
        v-else-if="searchQuery"
        class="mt-4 flex-1 flex flex-col items-center justify-center text-center px-4"
      >
        <Icon
          name="ph:magnifying-glass"
          class="w-12 h-12 text-muted-foreground mb-4"
        />
        <p class="text-lg font-medium mb-2">No results found</p>
        <p class="text-sm text-muted-foreground mb-4">
          We couldn't find anything for "{{ searchQuery }}". Try searching for
          something else.
        </p>
        <Button variant="outline" size="sm" @click="searchQuery = ''">
          Clear search
        </Button>
      </div>

      <div v-else class="mt-4 flex-1 flex flex-col min-h-0 max-h-[300px]">
        <div>
          <h3 class="mb-3 text-sm font-medium text-muted-foreground">
            Categories
          </h3>
          <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
            <NuxtLink
              v-for="category in categories"
              :key="category.name"
              :to="category.to"
              class="flex flex-col items-center gap-2 p-3 hover:bg-muted rounded-lg text-center"
              @click="dialog.close()"
            >
              <Icon
                :name="category.icon"
                class="w-6 h-6 text-muted-foreground"
              />
              <span class="text-sm text-muted-foreground">{{
                category.name
              }}</span>
            </NuxtLink>
          </div>
        </div>

        <div class="mt-6 flex-1 flex flex-col min-h-0">
          <h3 class="mb-3 text-sm font-medium text-muted-foreground">
            Popular Searches
          </h3>
          <div class="flex flex-col gap-1">
            <Button
              v-for="search in popularSearches"
              :key="search.query"
              variant="ghost"
              size="sm"
              class="justify-start text-sm h-9"
              @click="handlePopularSearch(search.query)"
            >
              <Icon
                name="ph:magnifying-glass"
                class="w-4 h-4 mr-2 text-muted-foreground"
              />
              {{ search.label }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
