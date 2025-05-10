<script setup lang="ts">
const searchQuery = ref('')
const { $client } = useNuxtApp()
const styles = await $client.communities.index.query()

const visibleStyles = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return styles.value?.filter((item) => item.name.toLowerCase().includes(query))
})
</script>

<template>
  <div class="bg-white p-4 flex flex-col gap-4">
    <section
      class="mx-auto flex max-w-md flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 page-header pb-8 page-header"
    >
      <h1
        class="text-center text-3xl font-bold tracking-tighter md:text-5xl leading-tight"
      >
        What’s Your Dance?
      </h1>
      <span
        class="max-w-[750px] text-center text-lg font-light text-foreground"
      >
        Discover and learn social dances, find dance events, and connect with
        dancers worldwide
      </span>
      <Button as-child>
        <NuxtLink to="/start">Discover Your Next Dance</NuxtLink>
      </Button>
    </section>
    <section>
      <div class="flex justify-center">
        <div class="relative w-full max-w-md items-center mb-4">
          <Input
            type="text"
            v-model="searchQuery"
            placeholder="Filter by name"
            class="pl-10"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <Icon
              name="material-symbols:filter-list"
              class="text-muted-foreground"
              size="24"
            />
          </span>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="style in styles"
          :key="style.id"
          :to="`/dance/${style.hashtag}`"
          class="rounded-md"
        >
          <div class="aspect-video">
            <WYoutubeThumb
              v-if="style.video"
              :url="style.video"
              class="rounded-md"
            />
            <div v-else class="bg-gray-200 rounded-md w-full h-full" />
          </div>
          <div class="p-2">
            <div class="text-sm font-bold">
              {{ style.name }}
            </div>
            <div class="text-xs text-muted-foreground">
              {{ style.region }}
            </div>
            <div class="text-xs text-muted-foreground">
              {{ style.membersCount }} members
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
